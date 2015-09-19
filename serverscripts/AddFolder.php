<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Database.php';
include 'Folder.php';
include 'SessionValidation.php';
include 'XmlValidation.php';

if (validateInputData(array('SessionId', 'Name', 'ParentId'))) {
	if (validateSession(null) && validateUser() && connectToDatabase() && validatePermission(31)) {	
		$name = safeToSql($xmlData['Name']);
		$parentId = $xmlData['ParentId'];
		$path = getFolderPath($parentId, $name);
				
		if (!file_exists($path)) {
			if(mkdir($path)) {
				mysql_query("INSERT INTO Folders (Name, ParentId) VALUES ('$name', $parentId)");
				$response = "<Result>Ok</Result>";
				writeUserAction(31);
			} else {
				$error = 'Error making directory';
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