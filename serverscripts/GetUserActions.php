<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Database.php';
include 'Phrases.php';
include 'SessionValidation.php';
include 'XmlValidation.php';

if (validateInputData(array('SessionId', 'ItemsOnPage', 'PageNumber', 'UserId'))) {
	if (validateSession(null) && connectToDatabase()) {
		$userId          = intval($xmlData['UserId']);
		$itemsOnPage     = intval($xmlData['ItemsOnPage']);
		$pageNumber      = intval($xmlData['PageNumber']);

		$result1 = mysql_query("SELECT COUNT(*) AS Records FROM UserActions WHERE UserId = $userId");

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
		//$action = Action::Entered;

		$result2 = mysql_query("SELECT UserActions.Id, Actions.Action, UserActions.Date FROM Actions Join UserActions ON UserActions.ActionId = Actions.Id WHERE UserActions.UserId = $userId ORDER BY UserActions.Date DESC LIMIT $startRecord, $itemsOnPage");

		if ($result2 && mysql_num_rows($result2) > 0) {
			while ($row2 = mysql_fetch_array($result2)) {
				$id = $row2['Id'];
				$action = $row2['Action'];
				$lastDate = $row2['Date'];

				$response .= '<Row>';
				$response .= "<Id>$id</Id>";
				$response .= "<Action>$action</Action>";
				$response .= "<Date>$lastDate</Date>";
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
