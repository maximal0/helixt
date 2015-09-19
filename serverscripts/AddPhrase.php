<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Database.php';
include 'Phrases.php';
include 'SessionValidation.php';
include 'XmlValidation.php';

if (validateInputData(array('SessionId', 'Phrase'))) {
	if (validateSession(null) && validateUser() && connectToDatabase() && validatePermission(34)) {
		$currentLanguageId = intval($_SESSION['languageId']);
		$phrase = safeToSql($xmlData['Phrase']);
		mysql_query('INSERT INTO Dictionary () VALUES ()');
		$phraseId = mysql_insert_id();
		$userId = getUserId();
		$transDate = date('Y-m-d H:i:s');
		mysql_query("INSERT INTO PhraseTranslation (LanguageId, TextId, Translation, TranslateDate, TranslateBy) VALUES ($currentLanguageId, $phraseId, '$phrase', '$transDate', $userId)");
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
