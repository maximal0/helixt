<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Database.php';
include 'Phrases.php';
include 'SessionValidation.php';
include 'XmlValidation.php';

if (validateInputData(array('SessionId', 'UserId', 'GroupsNumber', 'GroupsIds'))) {
	if (validateSession(null) && connectToDatabase() && validatePermission(8)) {
		$userId = intval($xmlData['UserId']);
		$groupsNum = intval($xmlData['GroupsNumber']);
		
		for ($i = 0; $i < $groupsNum; $i++) {
			if (validateInputRecord($xmlData['GroupsIds'], $i, 'GroupId', $value)) {
				$groupId = $value;
				$result = mysql_query("SELECT COUNT(*) AS Records FROM UserGroups WHERE UserId = $userId And GroupId = $groupId");
				$row = mysql_fetch_array($result);
				if ($row['Records'] == 0) {
					mysql_query("INSERT INTO UserGroups (UserId, GroupId) VALUES ($userId, $groupId)");
				} 
			}
		}
		$response = '<Result>OK</Result>';
		writeUserAction(8);
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