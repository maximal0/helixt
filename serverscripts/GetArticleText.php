<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Articles.php';
include 'Database.php';
include 'SessionValidation.php';
include 'XmlValidation.php';

if (validateInputData(array('SessionId', 'Id'))) {
	if (validateSession(null) && validateUser() && connectToDatabase()) {	
		$id = intval($xmlData['Id']);
		$languageId = $_SESSION['languageId'];
				
		$result = mysql_query("SELECT ValueDictionaryId From ContentProperties WHERE ContentId = $id AND PropertyId = 13");
		if ($result) {
			$row = mysql_fetch_array($result);
			$response  = '<ArticleText><![CDATA[' . getArticle($row['ValueDictionaryId'], $languageId) . ']]></ArticleText>';
		}
	} else {
		$error = 'Invalid session';
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