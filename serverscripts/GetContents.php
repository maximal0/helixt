<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Database.php';
include 'Phrases.php';
include 'SessionValidation.php';
include 'XmlValidation.php';

if (validateInputData(array('SessionId', 'ItemsOnPage', 'PageNumber', 'Title', 'EditorId', 'TypeId', 'FromDate', 'ToDate'))) {
	if (validateSession(null) && validateUser() && connectToDatabase()) {
		$languageId = $_SESSION['languageId'];
		$itemsOnPage = intval($xmlData['ItemsOnPage']);
		$pageNumber = intval($xmlData['PageNumber']);
		$editorId = intval($xmlData['EditorId']);
		$typeId = intval($xmlData['TypeId']);
		$title = ($xmlData['Title'] === 'NaN') ? '' : safeToSql($xmlData['Title']);
		$fromDate = $xmlData['FromDate'];
		$toDate = $xmlData['ToDate'];
		
		if ($title != '') {
			if ($editorId != 0) {
				if ($typeId != 0) {
					$result1 = mysql_query("SELECT COUNT(*) AS records FROM Contents AS C JOIN ContentProperties AS CP ON C.Id = CP.ContentId JOIN PhraseTranslation AS CPT ON CP.ValueDictionaryId = CPT.TextID JOIN Properties AS P ON CP.PropertyID = P.Id JOIN PhraseTranslation AS PT ON P.NameDictionaryId = PT.TextId WHERE C.IsDeleted = 0 AND C.CreateDate >= '$fromDate' AND C.CreateDate <= '$toDate' AND CPT.LanguageId = $languageId AND CPT.Translation LIKE '%$title%' AND (PT.Translation = 'Entity Title' OR PT.Translation = 'Article Title' OR PT.Translation = 'Media Title') And PT.LanguageId = $languageId AND C.CreateBy = $editorId AND C.TypeId = $typeId");
				} else {
					$result1 = mysql_query("SELECT COUNT(*) AS records FROM Contents AS C JOIN ContentProperties AS CP ON C.Id = CP.ContentId JOIN PhraseTranslation AS CPT ON CP.ValueDictionaryId = CPT.TextID JOIN Properties AS P ON CP.PropertyID = P.Id JOIN PhraseTranslation AS PT ON P.NameDictionaryId = PT.TextId WHERE C.IsDeleted = 0 AND C.CreateDate >= '$fromDate' AND C.CreateDate <= '$toDate' AND CPT.LanguageId = $languageId AND CPT.Translation LIKE '%$title%' AND (PT.Translation = 'Entity Title' OR PT.Translation = 'Article Title' OR PT.Translation = 'Media Title') And PT.LanguageId = $languageId AND C.CreateBy = $editorId");
				}
			} else {
				if ($typeId != 0) {
					$result1 = mysql_query("SELECT COUNT(*) AS records FROM Contents AS C JOIN ContentProperties AS CP ON C.Id = CP.ContentId JOIN PhraseTranslation AS CPT ON CP.ValueDictionaryId = CPT.TextID JOIN Properties AS P ON CP.PropertyID = P.Id JOIN PhraseTranslation AS PT ON P.NameDictionaryId = PT.TextId WHERE C.IsDeleted = 0 AND C.CreateDate >= '$fromDate' AND C.CreateDate <= '$toDate' AND CPT.LanguageId = $languageId AND CPT.Translation LIKE '%$title%' AND (PT.Translation = 'Entity Title' OR PT.Translation = 'Article Title' OR PT.Translation = 'Media Title') And PT.LanguageId = $languageId AND C.TypeId = $typeId");
				} else {
					$result1 = mysql_query("SELECT COUNT(*) AS records FROM Contents AS C JOIN ContentProperties AS CP ON C.Id = CP.ContentId JOIN PhraseTranslation AS CPT ON CP.ValueDictionaryId = CPT.TextID JOIN Properties AS P ON CP.PropertyID = P.Id JOIN PhraseTranslation AS PT ON P.NameDictionaryId = PT.TextId WHERE C.IsDeleted = 0 AND C.CreateDate >= '$fromDate' AND C.CreateDate <= '$toDate' AND CPT.LanguageId = $languageId AND CPT.Translation LIKE '%$title%' AND (PT.Translation = 'Entity Title' OR PT.Translation = 'Article Title' OR PT.Translation = 'Media Title') And PT.LanguageId = $languageId");
				}
			}
		} else {
			if ($editorId != 0) {
				if ($typeId != 0) {
					$result1 = mysql_query("SELECT COUNT(*) AS records FROM Contents AS C JOIN ContentProperties AS CP ON C.Id = CP.ContentId JOIN Properties AS P ON CP.PropertyID = P.Id JOIN PhraseTranslation AS PT ON P.NameDictionaryId = PT.TextId WHERE C.IsDeleted = 0 AND C.CreateDate >= '$fromDate' AND C.CreateDate <= '$toDate' AND (PT.Translation = 'Entity Title' OR PT.Translation = 'Article Title' OR PT.Translation = 'Media Title') And PT.LanguageId = $languageId AND C.CreateBy = $editorId AND C.TypeId = $typeId");
				} else {
					$result1 = mysql_query("SELECT COUNT(*) AS records FROM Contents AS C JOIN ContentProperties AS CP ON C.Id = CP.ContentId JOIN Properties AS P ON CP.PropertyID = P.Id JOIN PhraseTranslation AS PT ON P.NameDictionaryId = PT.TextId WHERE C.IsDeleted = 0 AND C.CreateDate >= '$fromDate' AND C.CreateDate <= '$toDate' AND (PT.Translation = 'Entity Title' OR PT.Translation = 'Article Title' OR PT.Translation = 'Media Title') And PT.LanguageId = $languageId AND C.CreateBy = $editorId");
				}
			} else {
				if ($typeId != 0) {
					$result1 = mysql_query("SELECT COUNT(*) AS records FROM Contents AS C JOIN ContentProperties AS CP ON C.Id = CP.ContentId JOIN Properties AS P ON CP.PropertyID = P.Id JOIN PhraseTranslation AS PT ON P.NameDictionaryId = PT.TextId WHERE C.IsDeleted = 0 AND C.CreateDate >= '$fromDate' AND C.CreateDate <= '$toDate' AND (PT.Translation = 'Entity Title' OR PT.Translation = 'Article Title' OR PT.Translation = 'Media Title') And PT.LanguageId = $languageId AND C.TypeId = $typeId");
				} else {
					$result1 = mysql_query("SELECT COUNT(*) AS records FROM Contents AS C JOIN ContentProperties AS CP ON C.Id = CP.ContentId JOIN Properties AS P ON CP.PropertyID = P.Id JOIN PhraseTranslation AS PT ON P.NameDictionaryId = PT.TextId WHERE C.IsDeleted = 0 AND C.CreateDate >= '$fromDate' AND C.CreateDate <= '$toDate' AND (PT.Translation = 'Entity Title' OR PT.Translation = 'Article Title' OR PT.Translation = 'Media Title') And PT.LanguageId = $languageId");
				}
			}
		}
		
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
		
		if ($title != '') {
			if ($editorId != 0) {
				if ($typeId != 0) {
					$result2 = mysql_query("SELECT C.Id, CP.ValueDictionaryId, CT.NameDictionaryId, U.FullName, C.CreateDate FROM Contents AS C JOIN ContentTypes AS CT ON C.TypeId = CT.Id JOIN Users AS U ON C.CreateBy = U.Id JOIN ContentProperties AS CP ON C.Id = CP.ContentId JOIN PhraseTranslation AS CPT ON CP.ValueDictionaryId = CPT.TextID JOIN Properties AS P ON CP.PropertyID = P.Id JOIN PhraseTranslation AS PT ON P.NameDictionaryId = PT.TextId WHERE C.IsDeleted = 0 AND C.CreateDate >= '$fromDate' AND C.CreateDate <= '$toDate' AND CPT.LanguageId = $languageId AND CPT.Translation LIKE '%$title%' AND (PT.Translation = 'Entity Title' OR PT.Translation = 'Article Title' OR PT.Translation = 'Media Title') And PT.LanguageId = $languageId AND C.CreateBy = $editorId AND C.TypeId = $typeId LIMIT $startRecord, $itemsOnPage");
				} else {
					$result2 = mysql_query("SELECT C.Id, CP.ValueDictionaryId, CT.NameDictionaryId, U.FullName, C.CreateDate FROM Contents AS C JOIN ContentTypes AS CT ON C.TypeId = CT.Id JOIN Users AS U ON C.CreateBy = U.Id JOIN ContentProperties AS CP ON C.Id = CP.ContentId JOIN PhraseTranslation AS CPT ON CP.ValueDictionaryId = CPT.TextID JOIN Properties AS P ON CP.PropertyID = P.Id JOIN PhraseTranslation AS PT ON P.NameDictionaryId = PT.TextId WHERE C.IsDeleted = 0 AND C.CreateDate >= '$fromDate' AND C.CreateDate <= '$toDate' AND CPT.LanguageId = $languageId AND CPT.Translation LIKE '%$title%' AND (PT.Translation = 'Entity Title' OR PT.Translation = 'Article Title' OR PT.Translation = 'Media Title') And PT.LanguageId = $languageId AND C.CreateBy = $editorId LIMIT $startRecord, $itemsOnPage");
				}
			} else {
				if ($typeId != 0) {
					$result2 = mysql_query("SELECT C.Id, CP.ValueDictionaryId, CT.NameDictionaryId, U.FullName, C.CreateDate FROM Contents AS C JOIN ContentTypes AS CT ON C.TypeId = CT.Id JOIN Users AS U ON C.CreateBy = U.Id JOIN ContentProperties AS CP ON C.Id = CP.ContentId JOIN PhraseTranslation AS CPT ON CP.ValueDictionaryId = CPT.TextID JOIN Properties AS P ON CP.PropertyID = P.Id JOIN PhraseTranslation AS PT ON P.NameDictionaryId = PT.TextId WHERE C.IsDeleted = 0 AND C.CreateDate >= '$fromDate' AND C.CreateDate <= '$toDate' AND CPT.LanguageId = $languageId AND CPT.Translation LIKE '%$title%' AND (PT.Translation = 'Entity Title' OR PT.Translation = 'Article Title' OR PT.Translation = 'Media Title') And PT.LanguageId = $languageId AND C.TypeId = $typeId LIMIT $startRecord, $itemsOnPage");
				} else {
					$result2 = mysql_query("SELECT C.Id, CP.ValueDictionaryId, CT.NameDictionaryId, U.FullName, C.CreateDate FROM Contents AS C JOIN ContentTypes AS CT ON C.TypeId = CT.Id JOIN Users AS U ON C.CreateBy = U.Id JOIN ContentProperties AS CP ON C.Id = CP.ContentId JOIN PhraseTranslation AS CPT ON CP.ValueDictionaryId = CPT.TextID JOIN Properties AS P ON CP.PropertyID = P.Id JOIN PhraseTranslation AS PT ON P.NameDictionaryId = PT.TextId WHERE C.IsDeleted = 0 AND C.CreateDate >= '$fromDate' AND C.CreateDate <= '$toDate' AND CPT.LanguageId = $languageId AND CPT.Translation LIKE '%$title%' AND (PT.Translation = 'Entity Title' OR PT.Translation = 'Article Title' OR PT.Translation = 'Media Title') And PT.LanguageId = $languageId LIMIT $startRecord, $itemsOnPage");
				}
			}
		} else {
			if ($editorId != 0) {
				if ($typeId != 0) {
					$result2 = mysql_query("SELECT C.Id, CP.ValueDictionaryId, CT.NameDictionaryId, U.FullName, C.CreateDate FROM Contents AS C JOIN ContentTypes AS CT ON C.TypeId = CT.Id JOIN Users AS U ON C.CreateBy = U.Id JOIN ContentProperties AS CP ON C.Id = CP.ContentId JOIN Properties AS P ON CP.PropertyID = P.Id JOIN PhraseTranslation AS PT ON P.NameDictionaryId = PT.TextId WHERE C.IsDeleted = 0 AND C.CreateDate >= '$fromDate' AND C.CreateDate <= '$toDate' AND (PT.Translation = 'Entity Title' OR PT.Translation = 'Article Title' OR PT.Translation = 'Media Title') And PT.LanguageId = $languageId AND C.CreateBy = $editorId AND C.TypeId = $typeId LIMIT $startRecord, $itemsOnPage");
				} else {
					$result2 = mysql_query("SELECT C.Id, CP.ValueDictionaryId, CT.NameDictionaryId, U.FullName, C.CreateDate FROM Contents AS C JOIN ContentTypes AS CT ON C.TypeId = CT.Id JOIN Users AS U ON C.CreateBy = U.Id JOIN ContentProperties AS CP ON C.Id = CP.ContentId JOIN Properties AS P ON CP.PropertyID = P.Id JOIN PhraseTranslation AS PT ON P.NameDictionaryId = PT.TextId WHERE C.IsDeleted = 0 AND C.CreateDate >= '$fromDate' AND C.CreateDate <= '$toDate' AND (PT.Translation = 'Entity Title' OR PT.Translation = 'Article Title' OR PT.Translation = 'Media Title') And PT.LanguageId = $languageId AND C.CreateBy = $editorId LIMIT $startRecord, $itemsOnPage");
				}
			} else {
				if ($typeId != 0) {
					$result2 = mysql_query("SELECT C.Id, CP.ValueDictionaryId, CT.NameDictionaryId, U.FullName, C.CreateDate FROM Contents AS C JOIN ContentTypes AS CT ON C.TypeId = CT.Id JOIN Users AS U ON C.CreateBy = U.Id JOIN ContentProperties AS CP ON C.Id = CP.ContentId JOIN Properties AS P ON CP.PropertyID = P.Id JOIN PhraseTranslation AS PT ON P.NameDictionaryId = PT.TextId WHERE C.IsDeleted = 0 AND C.CreateDate >= '$fromDate' AND C.CreateDate <= '$toDate' AND (PT.Translation = 'Entity Title' OR PT.Translation = 'Article Title' OR PT.Translation = 'Media Title') And PT.LanguageId = $languageId AND C.TypeId = $typeId LIMIT $startRecord, $itemsOnPage");
				} else {
					$result2 = mysql_query("SELECT C.Id, CP.ValueDictionaryId, CT.NameDictionaryId, U.FullName, C.CreateDate FROM Contents AS C JOIN ContentTypes AS CT ON C.TypeId = CT.Id JOIN Users AS U ON C.CreateBy = U.Id JOIN ContentProperties AS CP ON C.Id = CP.ContentId JOIN Properties AS P ON CP.PropertyID = P.Id JOIN PhraseTranslation AS PT ON P.NameDictionaryId = PT.TextId WHERE C.IsDeleted = 0 AND C.CreateDate >= '$fromDate' AND C.CreateDate <= '$toDate' AND (PT.Translation = 'Entity Title' OR PT.Translation = 'Article Title' OR PT.Translation = 'Media Title') And PT.LanguageId = $languageId LIMIT $startRecord, $itemsOnPage");
				}
			}
		}
		
		if ($result2 && mysql_num_rows($result2) > 0) {
			while ($row2 = mysql_fetch_array($result2)) {
				$id = $row2['Id'];
				$title = getPhrase($row2['ValueDictionaryId'], $languageId);
				$type = getPhrase($row2['NameDictionaryId'], $languageId);
				$name = safeFromSql($row2['FullName']);
				if ($row2['NameDictionaryId'] == 203) {
					$result3 = mysql_query("SELECT Value FROM ContentProperties WHERE ContentId = $id AND PropertyId = 14");
					$row3 = mysql_fetch_array($result3);
					$date = safeFromSql($row3['Value']);
				} else {
					$date = safeFromSql($row2['CreateDate']);
				}
					
				$response .= '<Row>';
				$response .= "<Id>$id</Id>";
				$response .= "<Title>$title</Title>";
				$response .= "<Type>$type</Type>";
				$response .= "<CreateBy>$name</CreateBy>";
				$response .= "<CreateDate>$date</CreateDate>";
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