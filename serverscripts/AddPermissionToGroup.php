<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Database.php';
include 'Phrases.php';
include 'SessionValidation.php';
include 'XmlValidation.php';
		
if (validateInputData(array('SessionId', 'GroupId', 'PermissionsNumber', 'PermissionsIds'))) {
	if (validateSession(null) && connectToDatabase() && validatePermission(10)) {
		$groupId = intval($xmlData['GroupId']);
		$persNum = intval($xmlData['PermissionsNumber']);
		
		for ($i = 0; $i < $persNum; $i++) {
			if (validateInputRecord($xmlData['PermissionsIds'], $i, 'PermissionId', $value)) {
				$perId = $value;
				$result = mysql_query("SELECT COUNT(*) AS Records FROM GroupPermissions WHERE GroupId = $groupId And ActionId = $perId");
				$row = mysql_fetch_array($result);
				if ($row['Records'] == 0) {
					mysql_query("INSERT INTO GroupPermissions (GroupId, ActionId) VALUES ($groupId, $perId)");
				}
			}
		}
		$response = '<Result>OK</Result>';
		writeUserAction(10);
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