<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Database.php';
include 'Phrases.php';
include 'SessionValidation.php';
include 'XmlValidation.php';

if (validateInputData(array('SessionId', 'LanguageId', 'TitleTextId', 'TitleTranslation', 'ArticleTextId', 'ArticleTranslation', 'PropertyId'))) {
	if (validateSession(null) && validateUser() && connectToDatabase() && validatePermission(34) && validatePermission(35)) {
		$languageId = intval($xmlData['LanguageId']);
		$titleTextId = intval($xmlData['TitleTextId']);
		$titleTranslation = safeToSql($xmlData['TitleTranslation']);
		$articleTextId = intval($xmlData['ArticleTextId']);
		$articleTranslation = $xmlData['ArticleTranslation'];
		$userId = getUserId();
		$transDate = date('Y-m-d H:i:s');
		$propertyId = intval($xmlData['PropertyId']);
		
		if ($propertyId == 0) {
			$result = mysql_query("SELECT Id AS Records FROM PhraseTranslation WHERE LanguageId = $languageId AND TextId = $titleTextId");
		
			if (mysql_num_rows($result) == 0) {
				mysql_query("INSERT INTO PhraseTranslation (LanguageId, TextId, Translation, TranslateDate, TranslateBy) VALUES ($languageId, $titleTextId, '$titleTranslation', '$transDate', $userId)");
				writeUserAction(34);
			} else {
				mysql_query("UPDATE PhraseTranslation SET Translation = '$titleTranslation', TranslateDate = '$transDate', TranslateBy = $userId WHERE LanguageId = $languageId AND TextId = $titleTextId");
				writeUserAction(35);
			}
			
			$result = mysql_query("SELECT Id AS Records FROM ContentTranslation WHERE LanguageId = $languageId AND TextId = $articleTextId");
			
			if (mysql_num_rows($result) == 0) {
				mysql_query("INSERT INTO ContentTranslation (LanguageId, TextId, Translation, TranslateDate, TranslatedBy) VALUES ($languageId, $articleTextId, '$articleTranslation', '$transDate', $userId)");
				writeUserAction(34);
			} else {
				mysql_query("UPDATE ContentTranslation SET Translation = '$articleTranslation', TranslateDate = '$transDate', TranslatedBy = $userId WHERE LanguageId = $languageId AND TextId = $articleTextId");
				writeUserAction(35);
			}
			
			$response = "<Result>OK</Result>";
		} else {
			$result = mysql_query("SELECT Id AS Records FROM ContentTranslation WHERE LanguageId = $languageId AND TextId = $articleTextId");
			
			if (mysql_num_rows($result) == 0) {
				mysql_query("INSERT INTO ContentTranslation (LanguageId, TextId, Translation, TranslateDate, TranslatedBy) VALUES ($languageId, $articleTextId, '$articleTranslation', '$transDate', $userId)");
				writeUserAction(34);
			} else {
				mysql_query("UPDATE ContentTranslation SET Translation = '$articleTranslation', TranslateDate = '$transDate', TranslatedBy = $userId WHERE LanguageId = $languageId AND TextId = $articleTextId");
				writeUserAction(35);
			}
			
			$response = "<Result>OK</Result>";
		}
	} else {
		$error = 'Invalid session or no permission.';
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