<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Database.php';
include 'Phrases.php';
include 'SessionValidation.php';
include 'XmlValidation.php';

if (validateInputData(array('SessionId', 'Code', 'Language'))) {
	if (validateSession(null)) {
		if (validateUser()) {
			if (connectToDatabase()) {
				if (validatePermission(12)) {
					$languageCode = safeToSql(strtolower($xmlData['Code']));
					$languageName = safeToSql($xmlData['Language']);
					$result = mysql_query("SELECT COUNT(*) AS records FROM Languages WHERE Code = '$languageCode'");
	
					if ($result) {
						$row = mysql_fetch_array($result);
						
						if ($row['records'] == 0) {
							mysql_query("INSERT INTO Dictionary () VALUES ()");
							$phraseId = mysql_insert_id();
							$languageId = $_SESSION['languageId'];
							$user = getUserId();
							$transDate = date('Y-m-d H:i:s');
						
							mysql_query("INSERT INTO PhraseTranslation (LanguageId, TextId, Translation, TranslateDate, TranslateBy) VALUES ($languageId, $phraseId, '$languageName', '$transDate', $user)");
						
							mysql_query("INSERT INTO Languages (Code, Language, Active) VALUES ('$languageCode', $phraseId, 0)");
						
							$response = "<Result>OK</Result>";
							writeUserAction(12);
						} else {
							$error = 'Language with the same code already exists.';
						}
					} else {
						$error = 'Error accessing database.';
					}
				} else {
					$error = 'You have no permission.';
				}
			} else {
				$error = 'Can not connect to the database.';
			}
		} else {
			$error = 'You are not signed in.';
		}
	} else {
		$error = 'Invalid session number.';
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
