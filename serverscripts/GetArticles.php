<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Database.php';
include 'Phrases.php';
include 'SessionValidation.php';
include 'XmlValidation.php';

if (validateInputData(array('SessionId', 'ItemsOnPage', 'PageNumber', 'SearchTemplate'))) {
	if (validateSession(null) && validateUser() && connectToDatabase()) {
		$languageId = $_SESSION['languageId'];
		$itemsOnPage = intval($xmlData['ItemsOnPage']);
		$pageNumber = intval($xmlData['PageNumber']);
		$searchTemplate = safeToSql($xmlData['SearchTemplate']);
		
		$result1 = mysql_query("SELECT COUNT(*) AS records FROM Contents JOIN ContentProperties ON Contents.Id = ContentProperties.ContentId JOIN PhraseTranslation ON ContentProperties.ValueDictionaryId = PhraseTranslation.TextId WHERE Contents.TypeId = 2 AND Contents.IsDeleted = 0 AND ContentProperties.PropertyId = 10 AND PhraseTranslation.LanguageId = $languageId AND PhraseTranslation.Translation LIKE '%$searchTemplate%'");
		
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
		
		$result2 = mysql_query("SELECT Contents.Id, Users.FullName AS Name, PhraseTranslation.Translation AS Title FROM Contents JOIN Users ON Contents.CreateBy = Users.Id JOIN ContentProperties ON Contents.Id = ContentProperties.ContentId JOIN PhraseTranslation ON ContentProperties.ValueDictionaryId = PhraseTranslation.TextId WHERE Contents.TypeId = 2 AND Contents.IsDeleted = 0 AND ContentProperties.PropertyId = 10 AND PhraseTranslation.LanguageId = $languageId AND PhraseTranslation.Translation LIKE '%$searchTemplate%'");

		if ($result2 && mysql_num_rows($result2) > 0) {
			while ($row2 = mysql_fetch_array($result2)) {
				$id = intval($row2['Id']);
				$name = safeFromSql($row2['Name']);
				$title = safeFromSql($row2['Title']);
				
				$result3 = mysql_query("SELECT Value FROM ContentProperties WHERE ContentId = $id AND PropertyId = 14");
				$row3 = mysql_fetch_array($result3);
				$pDate = safeFromSql($row3['Value']);
					
				$response .= '<Row>';
				$response .= "<Id>$id</Id>";
				$response .= "<Title>$title</Title>";
				$response .= "<Author>$name</Author>";
				$response .= "<PublishDate>$pDate</PublishDate>";
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