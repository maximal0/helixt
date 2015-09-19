<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Database.php';
include 'Phrases.php';
include 'SessionValidation.php';
include 'XmlValidation.php';

if (validateInputData(array('SessionId', 'LanguageId', 'Status'))) {
	if (validateSession(null)) {
		if (validateUser()) {
			if (connectToDatabase()) {
				if (validatePermission(13)) {
					$languageId = intval($xmlData['LanguageId']);
					$languageStatus = intval($xmlData['Status']);
					
					mysql_query("UPDATE Languages SET Active = $languageStatus WHERE Id = $languageId");
					$response = "<Result>OK</Result>";
				} else {
					$error = 'You have no permission.';
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
