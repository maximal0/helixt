<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Database.php';
include 'Phrases.php';
include 'SessionValidation.php';
include 'XmlValidation.php';

if (validateInputData(array('SessionId', 'Id'))) {
	if (validateSession(null)) {
		if (validateUser()) {
			if (connectToDatabase()) {
				$id = intval($xmlData['Id']);
				$currentLanguageId = $_SESSION['languageId'];
				$result = mysql_query("SELECT NameDictionaryId FROM ContentTypes WHERE Id = $id");

				if ($result) {
					$row  = mysql_fetch_array($result);
					$response = '<Name>' . getPhrase($row['NameDictionaryId'], $currentLanguageId) . '</Name>';
				}
			} else {
				$error = 'Can not connect to the database.';
			}
		} else {
			$error = 'You are not signed in.';
		}
	} else {
		$error = 'Invalid session number.';
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