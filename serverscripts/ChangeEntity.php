<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Database.php';
include 'Phrases.php';
include 'SessionValidation.php';
include 'XmlValidation.php';

if (validateInputData(array('SessionId', 'Id', 'Name'))) {
	if (validateSession(null) && validateUser() && connectToDatabase() && validatePermission(19)) {	
		$name = safeToSql($xmlData['Name']);
		$id = intval($xmlData['Id']);
		
		$result = mysql_query("SELECT NameDictionaryId FROM ContentTypes WHERE Id = $id");
		if ($result) {
			$row  = mysql_fetch_array($result);
			$textId = intval($row['NameDictionaryId']);
			$languageId = $_SESSION['languageId'];
			$user = getUserId();
			$transDate = date('Y-m-d H:i:s');
					
			mysql_query("UPDATE PhraseTranslation SET Translation = '$name', TranslateDate = '$transDate', TranslateBy = $user WHERE LanguageId = $languageId AND TextId = $textId");
					
			$response = "<Result>OK</Result>";
			writeUserAction(19);
		} else {
			$error = 'Database error';
		}
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