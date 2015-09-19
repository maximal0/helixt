<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Database.php';
include 'Phrases.php';
include 'SessionValidation.php';
include 'XmlValidation.php';

if (validateInputData(array('SessionId', 'Id', 'Title', 'Description'))) {
	if (validateSession(null) && connectToDatabase() && validatePermission(25)) {
		$id = intval($xmlData['Id']);
		$title = safeToSql($xmlData['Title']);
		$desc = safeToSql($xmlData['Description']);
		$languageId = $_SESSION['languageId'];
		
		$result1 = mysql_query('SELECT * FROM Properties WHERE Id = 1 OR Id = 8');
		if ($result1 && mysql_num_rows($result1) > 0) {
			while($row1 = mysql_fetch_array($result1)) {
				$propertyId = intval($row1['Id']);
				$result2 = mysql_query("SELECT * FROM ContentProperties WHERE ContentId = $id AND PropertyId = $propertyId");
				$row2 = mysql_fetch_array($result2);
				$textId = intval($row2['ValueDictionaryId']);
				$transDate = date('Y-m-d H:i:s');
				$userId = getUserId();
				
				$result3 = mysql_query("SELECT * FROM PhraseTranslation WHERE TextId = $textId AND LanguageId = $languageId");		
				if (getPhrase($row1['NameDictionaryId'], 1) == 'Media Title') {
					if ($result3 && mysql_num_rows($result3) > 0) {
						$row3 = mysql_fetch_array($result3);
						$rId = intval($row3['Id']);
						mysql_query("UPDATE PhraseTranslation SET Translation = '$title', TranslateDate = '$transDate', TranslateBy = $userId WHERE Id = $rId");
						writeUserAction(35);
					} else {
						mysql_query("INSERT INTO PhraseTranslation (LanguageId, TextId, Translation, TranslateDate, TranslateBy) VALUES ($languageId, $textId, '$title', '$transDate', $userId)");
						writeUserAction(34);
					}			
				} else if (getPhrase($row1['NameDictionaryId'], 1) == 'Media Description') {
					if ($result3 && mysql_num_rows($result3) > 0) {
						$row3 = mysql_fetch_array($result3);
						$rId = intval($row3['Id']);
						mysql_query("UPDATE PhraseTranslation SET Translation = '$desc', TranslateDate = '$transDate', TranslateBy = $userId WHERE Id = $rId");
						writeUserAction(35);
					} else {
						mysql_query("INSERT INTO PhraseTranslation (LanguageId, TextId, Translation, TranslateDate, TranslateBy) VALUES ($languageId, $textId, '$desc', '$transDate', $userId)");
						writeUserAction(34);
					}			
				}
			}
			mysql_query("UPDATE Contents SET EditDate = '$transDate', EditBy = $userId WHERE Id = $id");
			writeUserAction(25);
			$response = '<Result>OK</Result>';
		}
	} else {
		$error = 'Invalid session or no permission';
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