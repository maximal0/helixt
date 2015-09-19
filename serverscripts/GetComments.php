<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Database.php';
include 'Phrases.php';
include 'SessionValidation.php';
include 'XmlValidation.php';

if (validateInputData(array('SessionId', 'ItemsOnPage', 'PageNumber', 'ParentId'))) {
	if (validateSession(null) && validateUser() && connectToDatabase()) {
		$languageId = $_SESSION['languageId'];
		$itemsOnPage = intval($xmlData['ItemsOnPage']);
		$pageNumber = intval($xmlData['PageNumber']);
		$parentId = intval($xmlData['ParentId']);
		
		$result1 = mysql_query("SELECT COUNT(*) AS records FROM Contents JOIN ContentProperties ON Contents.Id = ContentProperties.ContentId JOIN PhraseTranslation ON ContentProperties.ValueDictionaryId = PhraseTranslation.TextId WHERE Contents.TypeId = 3 AND Contents.IsDeleted = 0 AND Contents.ParentId = $parentId AND ContentProperties.PropertyId = 15 AND PhraseTranslation.LanguageId = $languageId");
		
		$rows1  = mysql_fetch_array($result1);
		$numberOfRecords = $rows1['records'];
		$numberOfPages   = intval($numberOfRecords / $itemsOnPage) + (($numberOfRecords % $itemsOnPage) == 0 ? 0 : 1);

		if ($pageNumber > $numberOfPages) {
			$pageNumber = $numberOfPages;
		}
						
		if ($numberOfPages <= 0) {
			$numberOfPages = 1;
		}
			
		if ($pageNumber <= 0) {
			$pageNumber = 1;
		}

		$response    = "<NumberOfPages>$numberOfPages</NumberOfPages><PageNumber>$pageNumber</PageNumber><Rows>";
		$startRecord = ($pageNumber - 1) * $itemsOnPage;
		
		$result2 = mysql_query("SELECT Contents.Id, Contents.CreateDate, Users.FullName AS Name, PhraseTranslation.Translation AS Comment FROM Contents JOIN Users ON Contents.CreateBy = Users.Id JOIN ContentProperties ON Contents.Id = ContentProperties.ContentId JOIN PhraseTranslation ON ContentProperties.ValueDictionaryId = PhraseTranslation.TextId WHERE Contents.TypeId = 3 AND Contents.IsDeleted = 0 AND Contents.ParentId = $parentId AND ContentProperties.PropertyId = 15 AND PhraseTranslation.LanguageId = $languageId");

		if ($result2 && mysql_num_rows($result2) > 0) {
			while ($row2 = mysql_fetch_array($result2)) {
				$id = intval($row2['Id']);
				$name = safeFromSql($row2['Name']);
				$comment = safeFromSql($row2['Comment']);
				$date = safeFromSql($row2['CreateDate']);
					
				$response .= '<Row>';
				$response .= "<Id>$id</Id>";
				$response .= "<Comment>$comment</Comment>";
				$response .= "<Author>$name</Author>";
				$response .= "<Date>$date</Date>";
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