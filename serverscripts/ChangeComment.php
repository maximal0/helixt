<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Database.php';
include 'Phrases.php';
include 'SessionValidation.php';
include 'XmlValidation.php';

if (validateInputData(array('SessionId', 'Id', 'Comment'))) {
	if (validateSession(null) && validateUser() && connectToDatabase() && validatePermission(25)) {
		$id = intval($xmlData['Id']);		
		$comment = safeToSql($xmlData['Comment']);
		
		$userId = getUserId();
		$editDate = date('Y-m-d H:i:s');
		$languageId = $_SESSION['languageId'];
		$propertyId = 15;
						
		$result1 = mysql_query("SELECT ValueDictionaryId FROM ContentProperties Where ContentId = $id AND PropertyId = $propertyId");
		if ($result1 && mysql_num_rows($result1) > 0) {
			$row1 = mysql_fetch_array($result1);
			$textId = intval($row1['ValueDictionaryId']);
			$result2 = mysql_query("SELECT * FROM PhraseTranslation WHERE TextId = $textId AND LanguageId = $languageId");			
			if ($result2 && mysql_num_rows($result2) > 0) {
				$row2 = mysql_fetch_array($result2);
				$rId = intval($row2['Id']);
				mysql_query("UPDATE PhraseTranslation SET Translation = '$comment', TranslateDate = '$editDate', TranslateBy = $userId WHERE Id = $rId");
				writeUserAction(35);
			} else {
				mysql_query("INSERT INTO PhraseTranslation (LanguageId, TextId, Translation, TranslateDate, TranslateBy) VALUES ($languageId, $textId, '$comment', '$editDate', $userId)");
				writeUserAction(34);
			}	
			mysql_query("Update Contents SET EditDate = '$editDate', EditBy = $userId WHERE Id = $id");
			writeUserAction(25);
			$response = "<Result>OK</Result>";
		} else {
			$error = 'Database error';
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