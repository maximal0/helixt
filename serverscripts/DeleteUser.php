<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Database.php';
include 'Phrases.php';
include 'SessionValidation.php';
include 'XmlValidation.php';

if (validateInputData(array('SessionId', 'UserId'))) {
	if (validateSession(null) && connectToDatabase() && validatePermission(3)) {
		$deleteBy = intval($_SESSION['userId']);
		$userId = intval($xmlData['UserId']);
		$deleteDate = date('Y-m-d H:i:s');

		if (mysql_query("UPDATE Users SET IsDeleted = true, DeleteDate = '$deleteDate', DeleteBy = $deleteBy WHERE Id = $userId")) {
			$response = '<Result>OK</Result>';
			writeUserAction(3);
		} else {
			$error = 'Error deleting user!';
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