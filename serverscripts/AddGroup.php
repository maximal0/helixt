<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Database.php';
include 'Phrases.php';
include 'SessionValidation.php';
include 'XmlValidation.php';

if (validateInputData(array('SessionId', 'Name'))) {
	if (validateSession(null) && validateUser() && connectToDatabase() && validatePermission(5)) {	
		$name = safeToSql($xmlData['Name']);
		$result = mysql_query("SELECT COUNT(*) AS Records FROM Groups WHERE Name = '$name'");
		$row = mysql_fetch_array($result);
					
		if ($row['Records'] == 0) {
			mysql_query("INSERT INTO Groups (Name) VALUES ('$name')");
			$groupId = mysql_insert_id();
			$response = "<Result>$groupId</Result>";
			writeUserAction(5);
		} else {
			$response = '<Result>Exists</Result>';
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