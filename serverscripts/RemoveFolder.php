<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Database.php';
include 'Folder.php';
include 'SessionValidation.php';
include 'XmlValidation.php';

if (validateInputData(array('SessionId', 'Id', 'Name', 'ParentId'))) {
	if (validateSession(null) && validateUser() && connectToDatabase() && validatePermission(33)) {
		$id = intval($xmlData['Id']);		
		$name = safeToSql($xmlData['Name']);
		$parentId = $xmlData['ParentId'];
		
		$result = mysql_query("SELECT COUNT(*) AS Records FROM Pages WHERE FolderId = $id");
		$row = mysql_fetch_array($result);
		
		if ($row['Records'] == 0) {
			$path = getFolderPath($parentId, $name);
			if (file_exists($path)) {
				if (rmdir($path)) {
					mysql_query("DELETE FROM Folders WHERE Id = $id");
					$response = "<Result>Ok</Result>";
					writeUserAction(33);
				} else {
					$response = '<Result>Used</Result>';
				}
			} else {
				$error = 'Directory not found';
			}
		} else {
			$response = '<Result>Used</Result>';
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