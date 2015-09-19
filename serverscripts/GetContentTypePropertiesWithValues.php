<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Database.php';
include 'Phrases.php';
include 'Articles.php';
include 'SessionValidation.php';
include 'XmlValidation.php';

if (validateInputData(array('SessionId', 'ContentId'))) {
	if (validateSession(null) && validateUser() && connectToDatabase()) {
		$contentId = intval($xmlData['ContentId']);	
		$languageId = $_SESSION['languageId'];
		$result = mysql_query("SELECT * FROM ContentProperties Where ContentId = $contentId");
		$response = '';
		$xmlStr = '';
		
		if ($result && mysql_num_rows($result) > 0) {
			while ($row = mysql_fetch_array($result)) {
				$propertyId = intval($row['PropertyId']);
				$result1 = mysql_query("SELECT * FROM Properties Where Id = $propertyId");
				
				if ($result1 && mysql_num_rows($result1) > 0) {
					$row1 = mysql_fetch_array($result1);
					
					if ($row1['ValueDescription'] != null && $row1['ValueDescription'] != '') {
						$xmlStr = "<?xml version='1.0'?><Root>" . $row1['ValueDescription'] . "</Root>";
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
									$xmlStr = $row1['ValueDescription'];
								}
							} else {
								$xmlStr = $row1['ValueDescription'];
							}
						}
					}
					
					$response .= '<Property>';
					$response .= '<Id>' . $row1['Id'] . '</Id>';
					$response .= '<Name>' . getPhrase($row1['NameDictionaryId'], $languageId) . '</Name>';
					$response .= '<ValueType>' . getPhrase($row1['ValueType'], $languageId) . '</ValueType>';
					$response .= '<Component>' . getPhrase($row1['ViewComponent'], $languageId) . '</Component>';
					$response .= '<ValueDescription>' . $xmlStr . '</ValueDescription>';
					$response .= '<Required>' . $row1['Required'] . '</Required>';
					
					if ($row['ValueDictionaryId'] == null) {
						$response .= '<Value>' . $row['Value'] . '</Value>';
					} else {
						if ($row1['ValueType'] == 151) {
							$response .= '<Value>' . getPhrase($row['ValueDictionaryId'], $languageId) . '</Value>';
						} else {
							$response .= '<Value><![CDATA[' . getArticle($row['ValueDictionaryId'], $languageId) . ']]></Value>';
						}
					}
					
					$response .= '</Property>';
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