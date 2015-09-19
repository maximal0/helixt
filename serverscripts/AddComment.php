<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Database.php';
include 'Phrases.php';
include 'SessionValidation.php';
include 'XmlValidation.php';

if (validateInputData(array('SessionId', 'ParentId', 'Comment'))) {
	if (validateSession(null) && validateUser() && connectToDatabase() && validatePermission(24)) {	
		$comment = safeToSql($xmlData['Comment']);
		$parentId = intval($xmlData['ParentId']);
		
		$userId = getUserId();
		$createDate = date('Y-m-d H:i:s');
		mysql_query("INSERT INTO Contents (TypeId, ParentId, CreateDate, CreateBy, IsDeleted) VALUES (3, $parentId, '$createDate', $userId, 0)");
		$id = mysql_insert_id();
		$languageId = $_SESSION['languageId'];
		$propertyId = 15;
		
		mysql_query("INSERT INTO Dictionary () VALUES ()");
		$textId = mysql_insert_id();
		mysql_query("INSERT INTO PhraseTranslation (LanguageId, TextId, Translation, TranslateDate, TranslateBy) VALUES ($languageId, $textId, '$comment', '$createDate', $userId)");
									
		mysql_query("INSERT INTO ContentProperties (ContentId, PropertyId, ValueDictionaryId) VALUES ($id, $propertyId, $textId)");
		
		writeUserAction(28);
		$response = "<Result>OK</Result>";
		writeUserAction(24);
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