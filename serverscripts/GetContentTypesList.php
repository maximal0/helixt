<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Database.php';
include 'Phrases.php';
include 'SessionValidation.php';
include 'XmlValidation.php';

if (validateInputData(array('SessionId'))) {
	if (validateSession(null) && validateUser() && connectToDatabase()) {
		$languageId = $_SESSION['languageId'];
		$result = mysql_query("SELECT * FROM ContentTypes");
		$response = '';
		
		if ($result && mysql_num_rows($result) > 0) {
			while ($row = mysql_fetch_array($result)) {
				if (getPhrase($row['NameDictionaryId'], 1) != 'Comment') {
					$response .= '<Type>';
					$response .= '<Id>' . $row['Id'] . '</Id>';
					$response .= '<Name>' . getPhrase($row['NameDictionaryId'], $languageId) . '</Name>';
					$response .= '</Type>';
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