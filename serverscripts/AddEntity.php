<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Database.php';
include 'Phrases.php';
include 'SessionValidation.php';
include 'XmlValidation.php';

if (validateInputData(array('SessionId', 'Name'))) {
	if (validateSession(null) && validateUser() && connectToDatabase() && validatePermission(18) && validatePermission(21)) {	
		$name = safeToSql($xmlData['Name']);
		
		mysql_query("INSERT INTO Dictionary (Type) VALUES (0)");
		$phraseId = mysql_insert_id();
		$languageId = $_SESSION['languageId'];
		$user = getUserId();
		$transDate = date('Y-m-d H:i:s');
						
		mysql_query("INSERT INTO PhraseTranslation (LanguageId, TextId, Translation, TranslateDate, TranslateBy) VALUES ($languageId, $phraseId, '$name', '$transDate', $user)");
						
		mysql_query("INSERT INTO ContentTypes (NameDictionaryId) VALUES ($phraseId)");
		$entityId = mysql_insert_id();
					
		mysql_query("INSERT INTO Properties (NameDictionaryId, ValueType, ContentTypeId, ViewComponent, ValueDescription, Required) VALUES (270, 151, $entityId, 172, '', 1)");
		$proId = mysql_insert_id();
										
		$response = "<EntityId>$entityId</EntityId><PropertyId>$proId</PropertyId>";
		writeUserAction(18);
		writeUserAction(21);
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