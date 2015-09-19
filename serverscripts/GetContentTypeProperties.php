<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Database.php';
include 'Phrases.php';
include 'SessionValidation.php';
include 'XmlValidation.php';

if (validateInputData(array('SessionId', 'TypeId'))) {
	if (validateSession(null) && validateUser() && connectToDatabase()) {
		$typeId = intval($xmlData['TypeId']);	
		$languageId = $_SESSION['languageId'];
		$result = mysql_query("SELECT * FROM Properties Where ContentTypeId = $typeId");
		$response = '';
		$xmlStr = '';
		
		if ($result && mysql_num_rows($result) > 0) {
			while ($row = mysql_fetch_array($result)) {
				if ($row['ValueDescription'] != null && $row['ValueDescription'] != '') {
					$xmlStr = "<?xml version='1.0'?><Root>" . $row['ValueDescription'] . "</Root>";
					$xmlReader = new XMLReader();
					$xmlReader->xml($xmlStr);
					$descData = xmlToArray($xmlReader);
					$xmlReader->close();
					
					if ($descData && validateInputRecord($descData, 0, 'Root', $root)) {
						if (validateInputRecord($root, 0, 'Type', $value)) {
							if ($value == 'Manual') {
								$xmlStr = "<Type>Manual</Type>";
								for ($i = 1; $i < count($root); $i++) {
									if (validateInputRecord($root, $i, 'Value', $value)) {
										$xmlStr .= "<Value><Id>$value</Id><Phrase>" . getPhrase($value, $languageId) . "</Phrase></Value>";
									}
								}
							} else {
								$xmlStr = $row['ValueDescription'];
							}
						} else {
							$xmlStr = $row['ValueDescription'];
						}
					}
				}
				
				$response .= '<Property>';
				$response .= '<Id>' . $row['Id'] . '</Id>';
				$response .= '<Name>' . getPhrase($row['NameDictionaryId'], $languageId) . '</Name>';
				$response .= '<ValueType>' . getPhrase($row['ValueType'], $languageId) . '</ValueType>';
				$response .= '<Component>' . getPhrase($row['ViewComponent'], $languageId) . '</Component>';
				$response .= '<ValueDescription>' . $xmlStr . '</ValueDescription>';
				$response .= '<Required>' . $row['Required'] . '</Required>';
				$response .= '</Property>';
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