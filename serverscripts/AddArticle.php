<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Database.php';
include 'Phrases.php';
include 'SessionValidation.php';
include 'XmlValidation.php';

if (validateInputData(array('SessionId', 'Title', 'PublishDate', 'Article'))) {
	if (validateSession(null) && validateUser() && connectToDatabase() && validatePermission(24)) {	
		$title = safeToSql($xmlData['Title']);
		$pDate = safeToSql($xmlData['PublishDate']);
		$article = $xmlData['Article'];
		
		$userId = getUserId();
		$createDate = date('Y-m-d H:i:s');
		mysql_query("INSERT INTO Contents (TypeId, CreateDate, CreateBy, IsDeleted) VALUES (2, '$createDate', $userId, 0)");
		$id = mysql_insert_id();
		$languageId = $_SESSION['languageId'];
						
		$result1 = mysql_query('SELECT * FROM Properties Where ContentTypeId = 2');
		if ($result1 && mysql_num_rows($result1) > 0) {
			while($row1 = mysql_fetch_array($result1)) {
				$propertyId = intval($row1['Id']);
								
				if (getPhrase($row1['NameDictionaryId'], 1) == 'Article Title') {
					mysql_query("INSERT INTO Dictionary (Type) VALUES (1)");
					$textId = mysql_insert_id();
					mysql_query("INSERT INTO PhraseTranslation (LanguageId, TextId, Translation, TranslateDate, TranslateBy) VALUES ($languageId, $textId, '$title', '$createDate', $userId)");
									
					mysql_query("INSERT INTO ContentProperties (ContentId, PropertyId, ValueDictionaryId) VALUES ($id, $propertyId, $textId)");
									
				} else if (getPhrase($row1['NameDictionaryId'], 1) == 'Article Publish Date') {
					mysql_query("INSERT INTO ContentProperties (ContentId, PropertyId, Value) VALUES ($id, $propertyId, '$pDate')");
									
				} else if (getPhrase($row1['NameDictionaryId'], 1) == 'Article Text') {
					mysql_query("INSERT INTO Dictionary (Type) VALUES (1)");
					$textId = mysql_insert_id();
					mysql_query("INSERT INTO ContentTranslation (LanguageId, TextId, Translation, TranslateDate, TranslatedBy) VALUES ($languageId, $textId, '$article', '$createDate', $userId)");
									
					mysql_query("INSERT INTO ContentProperties (ContentId, PropertyId, ValueDictionaryId) VALUES ($id, $propertyId, $textId)");
									
				}
				writeUserAction(28);
			}
		}
		$response = "<Result>OK</Result>";
		writeUserAction(24);
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