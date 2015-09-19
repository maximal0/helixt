<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Database.php';
include 'Phrases.php';
include 'SessionValidation.php';
include 'XmlValidation.php';

if (validateInputData(array('SessionId', 'GroupId', 'Name'))) {
	if (validateSession(null) && connectToDatabase() && validatePermission(6)) {
		$groupId = intval($xmlData['GroupId']);
		$name = safeToSql($xmlData['Name']);
		$queryResult = mysql_query("SELECT * FROM Groups WHERE Name = '$name'");
		
		if ($queryResult) {
			if (mysql_num_rows($queryResult) == 1) {
				$row = mysql_fetch_array($queryResult);
				
				if ($row['Id'] != $groupId) {
					$error = 'Exists';
				}
			}
		}

		if (!isset($error)) {
			if (mysql_query("UPDATE Groups SET Name = '$name' WHERE Id = $groupId")) {
				$response = '<Result>OK</Result>';
				writeUserAction(6);
			} else {
				$error = 'Error updating group';
			}
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