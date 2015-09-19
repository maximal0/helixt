<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Database.php';
include 'Phrases.php';
include 'SessionValidation.php';
include 'XmlValidation.php';

if (validateInputData(array('SessionId', 'ItemsOnPage', 'PageNumber', 'LanguageFrom', 'LanguageTo', 'SearchCriterion', 'SearchTemplate', 'TranslatedOnly'))) {
	if (validateSession(null) && validateUser() && connectToDatabase()) {
		$languageId = $_SESSION['languageId'];
		$itemsOnPage = intval($xmlData['ItemsOnPage']);
		$pageNumber = intval($xmlData['PageNumber']);
		$languageFrom = intval($xmlData['LanguageFrom']);
		$languageTo = intval($xmlData['LanguageTo']);
		$searchCriterion = intval($xmlData['SearchCriterion']);
		$searchTemplate = safeToSql($xmlData['SearchTemplate']);
		$translatedOnly = intval($xmlData['TranslatedOnly']);
		
		if ($translatedOnly == 0) {
			switch ($searchCriterion) {
			case 0: $result1 = mysql_query('SELECT COUNT(*) AS records FROM PhraseTranslation WHERE LanguageId = ' . $languageFrom); break;
			case 1: $result1 = mysql_query("SELECT COUNT(*) AS records FROM PhraseTranslation WHERE LanguageId = $languageFrom AND Translation COLLATE utf8_general_ci LIKE '%$searchTemplate%'"); break;
			case 2: $result1 = mysql_query("SELECT COUNT(*) AS records FROM PhraseTranslation WHERE LanguageId = $languageFrom AND Translation LIKE '%$searchTemplate%'"); break;
			default: $error = 'Unknown search criterion'; break;
			}
		} else {
			switch ($searchCriterion) {
			case 0: $result1 = mysql_query("SELECT COUNT(t1.Id) AS records FROM PhraseTranslation AS t1 LEFT JOIN PhraseTranslation AS t2 ON (t2.TextId = t1.TextId AND t2.LanguageId = $languageTo) WHERE t1.LanguageId = $languageFrom AND t2.Id IS NULL"); break;
			case 1: $result1 = mysql_query("SELECT COUNT(t1.Id) AS records FROM PhraseTranslation AS t1 LEFT JOIN PhraseTranslation AS t2 ON (t2.TextId = t1.TextId AND t2.LanguageId = $languageTo) WHERE t1.LanguageId = $languageFrom AND t2.Id IS NULL AND t1.Translation COLLATE utf8_general_ci LIKE '%$searchTemplate%'"); break;
			case 2: $result1 = mysql_query("SELECT COUNT(t1.Id) AS records FROM PhraseTranslation AS t1 LEFT JOIN PhraseTranslation AS t2 ON (t2.TextId = t1.TextId AND t2.LanguageId = $languageTo) WHERE t1.LanguageId = $languageFrom AND t2.Id IS NULL AND t1.Translation LIKE '%$searchTemplate%'"); break;
			default: $error = 'Unknown search criterion'; break;
			}
		}

		if (!isset($error)) {
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

			if ($translatedOnly == 0) {
				switch ($searchCriterion) {
				case 0: $result2 = mysql_query("SELECT t1.TextId AS PhraseId, t1.Translation AS TranslationFrom, t2.Translation AS TranslationTo FROM PhraseTranslation AS t1 LEFT JOIN PhraseTranslation AS t2 ON (t2.TextId = t1.TextId AND t2.LanguageId = $languageTo) WHERE t1.LanguageId = $languageFrom ORDER BY t1.TextId LIMIT $startRecord, $itemsOnPage"); break;
				case 1: $result2 = mysql_query("SELECT t1.TextId AS PhraseId, t1.Translation AS TranslationFrom, t2.Translation AS TranslationTo FROM PhraseTranslation AS t1 LEFT JOIN PhraseTranslation AS t2 ON (t2.TextId = t1.TextId AND t2.LanguageId = $languageTo) WHERE t1.LanguageId = $languageFrom AND t1.Translation COLLATE utf8_general_ci LIKE '%$searchTemplate%' ORDER BY t1.TextId LIMIT $startRecord, $itemsOnPage"); break;
				case 2: $result2 = mysql_query("SELECT t1.TextId AS PhraseId, t1.Translation AS TranslationFrom, t2.Translation AS TranslationTo FROM PhraseTranslation AS t1 LEFT JOIN PhraseTranslation AS t2 ON (t2.TextId = t1.TextId AND t2.LanguageId = $languageTo) WHERE t1.LanguageId = $languageFrom AND t1.Translation LIKE '%$searchTemplate%' ORDER BY t1.TextId LIMIT $startRecord, $itemsOnPage"); break;
				}
			} else {
				switch ($searchCriterion) {
				case 0: $result2 = mysql_query("SELECT t1.TextId AS PhraseId, t1.Translation AS TranslationFrom, t2.Translation AS TranslationTo FROM PhraseTranslation AS t1 LEFT JOIN PhraseTranslation AS t2 ON (t2.TextId = t1.TextId AND t2.LanguageId = $languageTo) WHERE t1.LanguageId = $languageFrom AND t2.Id IS NULL ORDER BY t1.TextId LIMIT $startRecord, $itemsOnPage"); break;
				case 1: $result2 = mysql_query("SELECT t1.TextId AS PhraseId, t1.Translation AS TranslationFrom, t2.Translation AS TranslationTo FROM PhraseTranslation AS t1 LEFT JOIN PhraseTranslation AS t2 ON (t2.TextId = t1.TextId AND t2.LanguageId = $languageTo) WHERE t1.LanguageId = $languageFrom AND t2.Id IS NULL AND t1.Translation COLLATE utf8_general_ci LIKE '%$searchTemplate%' ORDER BY t1.TextId LIMIT $startRecord, $itemsOnPage"); break;
				case 2: $result2 = mysql_query("SELECT t1.TextId AS PhraseId, t1.Translation AS TranslationFrom, t2.Translation AS TranslationTo FROM PhraseTranslation AS t1 LEFT JOIN PhraseTranslation AS t2 ON (t2.TextId = t1.TextId AND t2.LanguageId = $languageTo) WHERE t1.LanguageId = $languageFrom AND t2.Id IS NULL AND t1.Translation LIKE '%$searchTemplate%' ORDER BY t1.TextId LIMIT $startRecord, $itemsOnPage"); break;
				}
			}

			if ($result2 && mysql_num_rows($result2) > 0) {
				while ($row2 = mysql_fetch_array($result2)) {
					$phraseId = $row2['PhraseId'];
					$translationFrom = safeFromSql($row2['TranslationFrom']);
					$translationTo = safeFromSql($row2['TranslationTo']);
					
					$response .= '<Row>';
					$response .= "<Id>$phraseId</Id>";
					$response .= "<Number>$phraseId</Number>";
					$response .= "<From>$translationFrom</From>";
					$response .= "<To>$translationTo</To>";
					$response .= '</Row>';
				}
			}

			$response .= '</Rows>';
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
