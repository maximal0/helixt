<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Database.php';
include 'Phrases.php';
include 'SessionValidation.php';
include 'XmlValidation.php';

if (validateInputData(array('SessionId', 'Id', 'XMLValues'))) {
	if (validateSession(null) && validateUser() && connectToDatabase() && validatePermission(25)) {
		$contentId = intval($xmlData['Id']);		
		
		$userId = getUserId();
		$editDate = date('Y-m-d H:i:s');
		$languageId = $_SESSION['languageId'];
						
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
						$result1 = mysql_query("SELECT ValueDictionaryId FROM ContentProperties Where ContentId = $contentId AND PropertyId = $propertyId");
						if ($result1 && mysql_num_rows($result1) > 0) {
							$row1 = mysql_fetch_array($result1);
							$textId = intval($row1['ValueDictionaryId']);
							$result2 = mysql_query("SELECT * FROM PhraseTranslation WHERE TextId = $textId AND LanguageId = $languageId");
							if ($result2 && mysql_num_rows($result2) > 0) {
								$row2 = mysql_fetch_array($result2);
								$rId = intval($row2['Id']);
								mysql_query("UPDATE PhraseTranslation SET Translation = '$propertyValue', TranslateDate = '$editDate', TranslateBy = $userId WHERE Id = $rId");
								writeUserAction(35);
							} else {
								mysql_query("INSERT INTO PhraseTranslation (LanguageId, TextId, Translation, TranslateDate, TranslateBy) VALUES ($languageId, $textId, '$propertyValue', '$editDate', $userId)");
								writeUserAction(34);
							}
						}
					} else if ($saveTo == "ContentTranslation") {
						$result1 = mysql_query("SELECT ValueDictionaryId FROM ContentProperties Where ContentId = $contentId AND PropertyId = $propertyId");
						if ($result1 && mysql_num_rows($result1) > 0) {
							$row1 = mysql_fetch_array($result1);
							$textId = intval($row1['ValueDictionaryId']);
							$result2 = mysql_query("SELECT * FROM ContentTranslation WHERE TextId = $textId AND LanguageId = $languageId");
							if ($result2 && mysql_num_rows($result2) > 0) {
								$row2 = mysql_fetch_array($result2);
								$rId = intval($row2['Id']);
								mysql_query("UPDATE ContentTranslation SET Translation = '$propertyValue', TranslateDate = '$editDate', TranslatedBy = $userId WHERE Id = $rId");
								writeUserAction(35);
							} else {
								mysql_query("INSERT INTO ContentTranslation (LanguageId, TextId, Translation, TranslateDate, TranslatedBy) VALUES ($languageId, $textId, '$propertyValue', '$editDate', $userId)");
								writeUserAction(34);
							}
						}
					} else if ($saveTo == "ContentProperties Id") {
						mysql_query("UPDATE ContentProperties SET ValueDictionaryId = $propertyValue WHERE ContentId = $contentId AND PropertyId = $propertyId");
					} else if ($saveTo == "ContentProperties Value") {
						mysql_query("UPDATE ContentProperties SET Value = '$propertyValue' WHERE ContentId = $contentId AND PropertyId = $propertyId");
					}
					writeUserAction(29);
				}
			}
		}
		
		mysql_query("Update Contents SET EditDate = '$editDate', EditBy = $userId WHERE Id = $contentId");
		writeUserAction(25);
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