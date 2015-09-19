<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Database.php';
include 'Phrases.php';
include 'SessionValidation.php';
include 'XmlValidation.php';

if (validateInputData(array('SessionId', 'Id'))) {
	if (validateSession(null) && validateUser() && connectToDatabase() && validatePermission(23)) {	
		$id = intval($xmlData['Id']);
				
		$result = mysql_query("SELECT COUNT(*) AS Records FROM ContentProperties WHERE PropertyId = $id");
		$row = mysql_fetch_array($result);
		
		if ($row['Records'] == 0) {
			$result = mysql_query("SELECT NameDictionaryId FROM Properties WHERE Id = $id");
			if ($result) {
				$row  = mysql_fetch_array($result);
				$textId = intval($row['NameDictionaryId']);
				if (mysql_query("DELETE FROM PhraseTranslation WHERE TextId = $textId")) {
					mysql_query("DELETE FROM Dictionary WHERE TextId = $textId");
					mysql_query("DELETE FROM Properties WHERE Id = $id");
					
					$response = "<Result>OK</Result>";
					writeUserAction(23);
				} else {
					$error = 'Database error';
				}
			} else {
				$error = 'Database error';
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