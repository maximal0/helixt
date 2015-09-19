<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Database.php';
include 'Phrases.php';
include 'SessionValidation.php';
include 'XmlValidation.php';

if (validateInputData(array('SessionId', 'ItemsOnPage', 'PageNumber'))) {
	if (validateSession(null)) {
		$itemsOnPage = intval($xmlData['ItemsOnPage']);
		$pageNumber = intval($xmlData['PageNumber']);

		if (validateUser()) {
			if (connectToDatabase()) {
				$currentLanguageId = $_SESSION['languageId'];
				$result1 = mysql_query("SELECT COUNT(*) AS records FROM ContentTypes");
				$resultCountRow  = mysql_fetch_array($result1);
				$numberOfRecords = $resultCountRow['records'];
				$numberOfPages   = intval($numberOfRecords / $itemsOnPage) + (($numberOfRecords % $itemsOnPage) == 0 ? 0 : 1);

				if ($pageNumber > $numberOfPages) {
					$pageNumber = $numberOfPages;
				}
						
				if ($pageNumber <= 0) {
					$pageNumber = 1;
				}

				$response    = "<NumberOfPages>$numberOfPages</NumberOfPages><PageNumber>$pageNumber</PageNumber><Rows>";
				$startRecord = ($pageNumber - 1) * $itemsOnPage;

				$result2 = mysql_query("SELECT * FROM ContentTypes LIMIT $startRecord, $itemsOnPage");

				if ($result2 && mysql_num_rows($result2) > 0) {
					while ($row2 = mysql_fetch_array($result2)) {
						
						$id     = $row2['Id'];
						$type   = getPhrase($row2['NameDictionaryId'], $currentLanguageId);

						$response .= '<Row>';
						$response .= "<Id>$id</Id>";
						$response .= "<Name>$type</Name>";
						$response .= '</Row>';
					}
				}

				$response .= '</Rows>';
			} else {
				$error = 'Can not connect to the database.';
			}
		} else {
			$error = 'You are not signed in.';
		}
	} else {
		$error = 'Invalid session number.';
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