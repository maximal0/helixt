<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Database.php';
include 'Phrases.php';
include 'SessionValidation.php';
include 'XmlValidation.php';

if (validateInputData(array('SessionId', 'UserId', 'GroupId'))) {
	if (validateSession(null) && connectToDatabase() && validatePermission(9)) {
		$userId = intval($xmlData['UserId']);
		$groupId = intval($xmlData['GroupId']);

		if (mysql_query("DELETE FROM UserGroups WHERE UserId = $userId And GroupId = $groupId")) {
			$response = '<Result>OK</Result>';
			writeUserAction(9);
		} else {
			$error = 'Error deleting user group!';
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