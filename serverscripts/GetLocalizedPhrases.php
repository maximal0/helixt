<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Database.php';
include 'Phrases.php';
include 'SessionValidation.php';
include 'XmlValidation.php';

if (validateInputData(array('SessionId', 'LanguageId', 'Phrases'))) {
	if (validateSession(null)) {
		$languageId = intval($xmlData['LanguageId']);
		$_SESSION['languageId'] = $languageId;

		if (connectToDatabase()) {
			$phrases = safeToSql($xmlData['Phrases']);
			$response = '';
			$result = mysql_query("SELECT TextId, Translation FROM PhraseTranslation WHERE LanguageId = $languageId AND TextId IN ($phrases)");

			if ($result && mysql_num_rows($result) > 0) {
				$response = '';

				while ($row = mysql_fetch_array($result)) {
					$phraseId = $row['TextId'];
					$translation = safeFromSql($row['Translation']);

					$response .= '<Phrase>';
					$response .= "<Id>$phraseId</Id>";
					$response .= "<Text>$translation</Text>";
					$response .= '</Phrase>';
				}
			}
		} else {
			$error = 'Could not connect to the database.';
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
