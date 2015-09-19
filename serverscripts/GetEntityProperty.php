<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Database.php';
include 'Phrases.php';
include 'SessionValidation.php';
include 'XmlValidation.php';
	
if (validateInputData(array('SessionId', 'PropertyId'))) {
	if (validateSession(null) && connectToDatabase()) {
		$proId = intval($xmlData['PropertyId']);
		$currentLanguageId = $_SESSION['languageId'];
		$result = mysql_query("SELECT NameDictionaryId, ValueType, ViewComponent, ValueDescription, Required FROM Properties WHERE Id = $proId");

		if ($result) {
			$row = mysql_fetch_array($result);

			$response = '<Name>' . getPhrase($row['NameDictionaryId'], $currentLanguageId) . '</Name>';
			$response .= '<ValueType>' . getPhrase($row['ValueType'], $currentLanguageId) . '</ValueType>';
			$response .= '<ViewComponent>' . getPhrase($row['ViewComponent'], $currentLanguageId) . '</ViewComponent>';
			
			if ($row['ValueDescription'] != null && $row['ValueDescription'] != '') {
				$doc = new DOMDocument;
				$xml = '<?xml version="1.0" encoding="utf-8"?><Root>' . $row['ValueDescription'] . '</Root>';
				$doc->loadXML($xml);
				
				if ($doc->getElementsByTagName('Type')->length != 0) {
					$valueDescription = '<Type>' . $doc->getElementsByTagName('Type')->item(0)->nodeValue . '</Type>';
					$vals = $doc->getElementsByTagName('Value');
					foreach ($vals as $value) {
						$valueDescription .= '<Value><Id>' . $value->nodeValue . '</Id><Phrase>' . getPhrase($value->nodeValue, $currentLanguageId) . '</Phrase></Value>';
					}
					$response .= $valueDescription;
						
				} else {
					$response .= $row['ValueDescription'];
				}
			}
			
			$response .= '<Required>' . $row['Required'] . '</Required>';
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