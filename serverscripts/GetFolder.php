<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Database.php';
include 'SessionValidation.php';
include 'XmlValidation.php';

if (validateInputData(array('SessionId', 'Id'))) {
	if (validateSession(null) && validateUser() && connectToDatabase()) {	
		$id = intval($xmlData['Id']);
				
		$result = mysql_query("SELECT ParentId From Folders WHERE Id = $id");
		if ($result) {
			$row = mysql_fetch_array($result);
			$response  = '<ParentId>' . $row['ParentId'] . '</ParentId>';
		}
	} else {
		$error = 'Invalid session';
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