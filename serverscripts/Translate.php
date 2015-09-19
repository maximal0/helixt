<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Database.php';
include 'Phrases.php';
include 'SessionValidation.php';
include 'XmlValidation.php';

if (validateInputData(array('SessionId', 'LanguageId', 'PhraseId', 'Translation'))) {
	if (validateSession(null) && validateUser() && connectToDatabase() && validatePermission(34)) {
		$languageId = intval($xmlData['LanguageId']);
		$phraseId = intval($xmlData['PhraseId']);
		$translation = safeToSql($xmlData['Translation']);
		$userId = getUserId();
		$transDate = date('Y-m-d H:i:s');
		
		$result = mysql_query("SELECT Id AS Records FROM PhraseTranslation WHERE LanguageId = $languageId AND TextId = $phraseId");
		
		if (mysql_num_rows($result) == 0) {
			mysql_query("INSERT INTO PhraseTranslation (LanguageId, TextId, Translation, TranslateDate, TranslateBy) VALUES ($languageId, $phraseId, '$translation', '$transDate', $userId)");
		} else {
			mysql_query("UPDATE PhraseTranslation SET Translation = '$translation', TranslateDate = '$transDate', TranslateBy = $userId WHERE LanguageId = $languageId AND TextId = $phraseId");
		}
		
		$response = "<Result>OK</Result>";
		writeUserAction(34);
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
