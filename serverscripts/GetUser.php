<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Database.php';
include 'Phrases.php';
include 'SessionValidation.php';
include 'XmlValidation.php';

if (validateInputData(array('SessionId', 'UserId'))) {
	if (validateSession(null) && connectToDatabase()) {
		$userId = intval($xmlData['UserId']);
		$result = mysql_query("SELECT FullName AS Name, Email, UserName AS Username, Address, Phone, Sex FROM Users WHERE Id = $userId");

		if ($result) {
			$row = mysql_fetch_array($result);

			$response  = '<Email>' . safeFromSql($row['Email']) . '</Email>';
			$response .= '<Name>' . safeFromSql($row['Name']) . '</Name>';
			$response .= '<Username>' . safeFromSql($row['Username']) . '</Username>';
			$response .= '<Sex>' . $row['Sex'] . '</Sex>';
			$response .= '<Address>' . safeFromSql($row['Address']) . '</Address>';
			$response .= '<Phone>' . safeFromSql($row['Phone']) . '</Phone>';
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
