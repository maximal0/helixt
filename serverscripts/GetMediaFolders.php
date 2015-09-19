<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Database.php';
include 'Phrases.php';
include 'SessionValidation.php';
include 'XmlValidation.php';

if (validateInputData(array('SessionId'))) {
	if (validateSession(null) && connectToDatabase()) {
		$response = "<Rows>";
		$result = mysql_query("SELECT * FROM Folders");
		
		if ($result && mysql_num_rows($result) > 0) {
			while ($row = mysql_fetch_array($result)) {
				$id   = $row['Id'];
				$title = safeFromSql($row['Name']);
				$ParentName = safeFromSql($row['ParentId']);

				$response .= '<Row>';
				$response .= "<Name>$id</Name>";
				$response .= "<Title>$title</Title>";
				$response .= "<Type>Folder</Type>";
				$response .= "<ParentName>$ParentName</ParentName>";
				$response .= '</Row>';
			}
		}

		$response .= '</Rows>';
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