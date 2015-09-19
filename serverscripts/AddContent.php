<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Database.php';
include 'Phrases.php';
include 'SessionValidation.php';
include 'XmlValidation.php';

if (validateInputData(array('SessionId', 'TypeId', 'XMLValues'))) {
	if (validateSession(null) && validateUser() && connectToDatabase() && validatePermission(24)) {	
		$typeId = intval($xmlData['TypeId']);
		$userId = getUserId();
		$createDate = date('Y-m-d H:i:s');
		$languageId = $_SESSION['languageId'];
		
		mysql_query("INSERT INTO Contents (TypeId, CreateDate, CreateBy, IsDeleted) VALUES ($typeId, '$createDate', $userId, 0)");
		$contentId = mysql_insert_id();
		writeUserAction(24);
		
		if (validateInputRecord($xmlData['XMLValues'], 0, 'Properties', $root)) {
			for ($i = 0; $i < count($root); $i++) {
				if (validateInputRecord($root, $i, 'Property', $values)) {
					$propertyId = ''; $propertyValue = ''; $saveTo = '';
					for ($j = 0; $j < count($values); $j++) {
						if (validateInputRecord($values, $j, 'PropertyId', $value)) {
							$propertyId = $value;
						} else if (validateInputRecord($values, $j, 'Value', $value)) {
							$propertyValue = $value;
						} else if (validateInputRecord($values, $j, 'SaveTo', $value)) {
							$saveTo = $value;
						}
					}
					if ($saveTo == "PhraseTranslation") {
						mysql_query("INSERT INTO Dictionary (Type) VALUES (0)");
						$textId = mysql_insert_id();
						mysql_query("INSERT INTO PhraseTranslation (LanguageId, TextId, Translation, TranslateDate, TranslateBy) VALUES ($languageId, $textId, '$propertyValue', '$createDate', $userId)");
										
						mysql_query("INSERT INTO ContentProperties (ContentId, PropertyId, ValueDictionaryId) VALUES ($contentId, $propertyId, $textId)");
						
					} else if ($saveTo == "ContentTranslation") {
						mysql_query("INSERT INTO Dictionary (Type) VALUES (1)");
						$textId = mysql_insert_id();
						mysql_query("INSERT INTO ContentTranslation (LanguageId, TextId, Translation, TranslateDate, TranslatedBy) VALUES ($languageId, $textId, '$propertyValue', '$createDate', $userId)");
										
						mysql_query("INSERT INTO ContentProperties (ContentId, PropertyId, ValueDictionaryId) VALUES ($contentId, $propertyId, $textId)");
						
					} else if ($saveTo == "ContentProperties Id") {
						mysql_query("INSERT INTO ContentProperties (ContentId, PropertyId, ValueDictionaryId) VALUES ($contentId, $propertyId, $propertyValue)");
					} else if ($saveTo == "ContentProperties Value") {
						mysql_query("INSERT INTO ContentProperties (ContentId, PropertyId, Value) VALUES ($contentId, $propertyId, '$propertyValue')");
					}
					writeUserAction(28);
				}
			}
		}
		
		$response = "<Result>OK</Result>";
	} else {
		$error = 'Invalid session or no permission';
	}
}

header('Content-Type: text/xml; charset=utf-8');

echo '<?xml version="1.0" encoding="utf-8"?>' . "\n";

if (isset($error)) {
	echo '<Vtf><Error reason="' . $error . '" /></Vtf>';
} else if (isset($response)) {
	echo '<Vtf>' . $response . '</Vtf>';
} else {
	echo '<Vtf><Error reason="Unexpected server error." /></Vtf>';
}

?>