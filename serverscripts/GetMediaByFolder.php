<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Database.php';
include 'Phrases.php';
include 'SessionValidation.php';
include 'XmlValidation.php';

if (validateInputData(array('SessionId', 'ItemsOnPage', 'PageNumber', 'Folder'))) {
	if (validateSession(null) && connectToDatabase()) {
		$itemsOnPage     = intval($xmlData['ItemsOnPage']);
		$pageNumber      = intval($xmlData['PageNumber']);
		$folder          = $xmlData['Folder'];
		$result1         = mysql_query("SELECT COUNT(*) AS Records FROM ContentProperties JOIN Contents ON ContentProperties.ContentId = Contents.Id WHERE ContentProperties.PropertyId = 9 AND ContentProperties.Value = $folder AND Contents.IsDeleted = 0");
		if ($result1 && mysql_num_rows($result1) > 0) {
			$rows1           = mysql_fetch_array($result1);
			$numberOfRecords = $rows1['Records'];
			$numberOfPages   = intval($numberOfRecords / $itemsOnPage) + (($numberOfRecords % $itemsOnPage) == 0 ? 0 : 1);
	
			if ($pageNumber > $numberOfPages) {
				$pageNumber = $numberOfPages;
			}
							
			if ($pageNumber <= 0) {
				$pageNumber = 1;
			}
	
			$response = "<NumberOfPages>$numberOfPages</NumberOfPages><PageNumber>$pageNumber</PageNumber><Rows>";
			$startRecord = ($pageNumber - 1) * $itemsOnPage;
			
			$result2 = mysql_query("SELECT ContentId FROM ContentProperties JOIN Contents ON ContentProperties.ContentId = Contents.Id WHERE ContentProperties.PropertyId = 9 AND ContentProperties.Value = $folder AND Contents.IsDeleted = 0 ORDER BY ContentId LIMIT $startRecord, $itemsOnPage");
			$languageId = $_SESSION['languageId'];
			
			if ($result2 && mysql_num_rows($result2) > 0) {
				while ($row2 = mysql_fetch_array($result2)) {
					$contentId   = $row2['ContentId'];
					$response .= '<Row>';
					$response .= "<Id>$contentId</Id>";
					$result3 = mysql_query("SELECT * FROM ContentProperties WHERE ContentId = $contentId");
					while ($row3 = mysql_fetch_array($result3)) {
						if (intval($row3['PropertyId']) == 1) { // Title
							$title = getPhrase($row3['ValueDictionaryId'], $languageId);
							$response .= "<Title>$title</Title>";
							
						} else if (intval($row3['PropertyId']) == 2) { // Type
							$type = safeFromSql($row3['Value']);
							$response .= "<Type>$type</Type>";
							
						} else if (intval($row3['PropertyId']) == 6) { // URL
							$url = safeFromSql($row3['Value']);
							$response .= "<URL>$url</URL>";
							
						} else if (intval($row3['PropertyId']) == 8) { // Description
							$desc = getPhrase($row3['ValueDictionaryId'], $languageId);
							$response .= "<Description>$desc</Description>";
							
						}
					}
					$response .= '</Row>';
				}
			}
	
			$response .= '</Rows>';
		} else {
			$response = "<NumberOfPages>0</NumberOfPages><PageNumber>0</PageNumber><Rows></Rows>";
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