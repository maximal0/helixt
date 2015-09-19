<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Database.php';
include 'Phrases.php';
include 'SessionValidation.php';
include 'XmlValidation.php';

if (validateInputData(array('SessionId', 'ContentTypeId'))) {
	if (validateSession(null) && validateUser() && connectToDatabase()) {
		$currentLanguageId = $_SESSION['languageId'];
		$currentContentTypeId = $xmlData['ContentTypeId'];
		$result = mysql_query("SELECT * FROM Properties WHERE Properties.ValueType = 151 AND ContentTypeId != $currentContentTypeId AND ContentTypeId != 1 AND ContentTypeId != 3");
		$response = '';
		
		/*$response .= '<Row>';
		$response .= '<Id>folder</Id>';
		$response .= '<Name>Folder->Name</Name>';
		$response .= '</Row>';*/
		$response .= '<Row>';
		$response .= '<Id>language</Id>';
		$response .= '<Name>Language->Name</Name>';
		$response .= '</Row>';
		
		if ($result && mysql_num_rows($result) > 0) {
			while ($row = mysql_fetch_array($result)) {
				$typeId = $row['ContentTypeId'];
				$result2 = mysql_query("SELECT * FROM ContentTypes WHERE Id = $typeId");
				if ($result2) {
					$row2 = mysql_fetch_array($result2);
					$response .= '<Row>';
					$response .= '<Id>' . $row['Id'] . '</Id>';
					$response .= '<Name>' . getPhrase($row2['NameDictionaryId'], $currentLanguageId) . '->' . getPhrase($row['NameDictionaryId'], $currentLanguageId) . '</Name>';
					$response .= '</Row>';
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