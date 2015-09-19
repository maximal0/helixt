<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Database.php';
include 'Phrases.php';
include 'SessionValidation.php';
include 'XmlValidation.php';

if (validateInputData(array('SessionId', 'GroupId'))) {
	if (validateSession(null) && connectToDatabase() && validatePermission(7)) {
		$groupId = intval($xmlData['GroupId']);
		
		$result = mysql_query("SELECT COUNT(*) AS Records FROM GroupPermissions WHERE GroupId = $groupId");
		$row = mysql_fetch_array($result);
					
		if ($row['Records'] == 0) {
			$result = mysql_query("SELECT COUNT(*) AS Records FROM UserGroups WHERE GroupId = $groupId");
			$row = mysql_fetch_array($result);
			if ($row['Records'] == 0) {
				if (mysql_query("DELETE FROM Groups WHERE Id = $groupId")) {
					$response = '<Result>OK</Result>';
					writeUserAction(7);
				} else {
					$error = 'Error deleting group!';
				}
			} else {
				$error = 'Cannot delete group because there are records related to it!';
			}
		} else {
			$error = 'Cannot delete group because there are records related to it!';
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