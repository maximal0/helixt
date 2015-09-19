<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Database.php';
include 'Folder.php';
include 'SessionValidation.php';
include 'XmlValidation.php';

if (validateInputData(array('SessionId', 'Id', 'ParentId', 'OldName', 'NewName'))) {
	if (validateSession(null) && validateUser() && connectToDatabase() && validatePermission(32)) {	
		$oldName = safeToSql($xmlData['OldName']);
		$newName = safeToSql($xmlData['NewName']);
		$parentId = $xmlData['ParentId'];
		$id = intval($xmlData['Id']);
		$oldPath = getFolderPath($parentId, $oldName);
		$newPath = getFolderPath($parentId, $newName);
				
		if (!file_exists($newPath)) {
			if(rename($oldPath, $newPath)) {
				mysql_query("UPDATE Folders SET Name = '$newName' WHERE Id = $id");
				$response = "<Result>Ok</Result>";
				writeUserAction(32);
			} else {
				$error = 'Error renaming directory';
			}
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