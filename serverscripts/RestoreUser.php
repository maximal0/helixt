<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Database.php';
include 'Phrases.php';
include 'SessionValidation.php';
include 'XmlValidation.php';

if (validateInputData(array('SessionId', 'UserId'))) {
	if (validateSession(null) && connectToDatabase() && validatePermission(4)) {
		$userId = intval($xmlData['UserId']);

		if (mysql_query("UPDATE Users SET IsDeleted = 0, DeleteDate = null, DeleteBy = null WHERE Id = $userId")) {
			$response = '<Result>OK</Result>';
			writeUserAction(4);
		} else {
			$error = 'Error restoring user';
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