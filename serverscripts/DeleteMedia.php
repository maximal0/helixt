<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Database.php';
include 'Phrases.php';
include 'SessionValidation.php';
include 'XmlValidation.php';

if (validateInputData(array('SessionId', 'Id'))) {
	if (validateSession(null) && connectToDatabase() && validatePermission(26)) {
		$id = intval($xmlData['Id']);
		$userId = getUserId();
		$deleteDate = date('Y-m-d H:i:s');
		
		mysql_query("UPDATE Contents SET DeleteDate = '$deleteDate', DeleteBy = $userId, IsDeleted = 1 WHERE Id = $id");
		writeUserAction(26);
		$response = '<Result>OK</Result>';
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