<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Database.php';
include 'Phrases.php';
include 'SessionValidation.php';
include 'XmlValidation.php';

if (validateInputData(array('SessionId', 'GroupId'))) {
	if (validateSession(null) && connectToDatabase()) {
		$groupId = intval($xmlData['GroupId']);
		$result = mysql_query("SELECT * FROM Groups WHERE Id = $groupId");

		if ($result) {
			$row = mysql_fetch_array($result);

			$response = '<Name>' . safeFromSql($row['Name']) . '</Name>';
		}
	} else {
		$error = 'Invalid session.';
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