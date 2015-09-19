<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Database.php';
include 'Phrases.php';
include 'SessionValidation.php';
include 'XmlValidation.php';

if (validateInputData(array('SessionId', 'PropertyId'))) {
	if (validateSession(null) && validateUser() && connectToDatabase()) {
		$languageId = $_SESSION['languageId'];
		$proId = $xmlData['PropertyId'];
		$response = '';
		
		if ($proId == 'language') {
			$result = mysql_query("SELECT Id, Language FROM Languages WHERE Active = 1");
			
			if ($result && mysql_num_rows($result) > 0) {
				while ($row = mysql_fetch_array($result)) {
					$response .= '<Item>';
					$response .= '<Id>' . $row['Language'] . '</Id>';
					$response .= '<Value>' . getPhrase($row['Language'], $languageId) . '</Value>';
					$response .= '</Item>';
				}
			}
		} else {
			$result = mysql_query("SELECT * FROM ContentProperties WHERE PropertyId = $proId");
			
			if ($result && mysql_num_rows($result) > 0) {
				while ($row = mysql_fetch_array($result)) {
					if ($row['ValueDictionaryId'] != null) {
						$response .= '<Item>';
						$response .= '<Id>' . $row['ValueDictionaryId'] . '</Id>';
						$response .= '<Value>' . getPhrase($row['ValueDictionaryId'], $languageId) . '</Value>';
						$response .= '</Item>';
					} 
				}
			}
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