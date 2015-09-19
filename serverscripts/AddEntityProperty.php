<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Database.php';
include 'Phrases.php';
include 'SessionValidation.php';
include 'XmlValidation.php';

if (validateInputData(array('SessionId', 'Name', 'ValueType', 'ContentTypeId', 'ViewComponent', 'ValueDescription', 'Required'))) {
	if (validateSession(null) && validateUser() && connectToDatabase() && validatePermission(21)) {	
		$name = safeToSql($xmlData['Name']);
		$valueType = $xmlData['ValueType'];
		$contentTypeId = intval($xmlData['ContentTypeId']);
		$viewComponent = $xmlData['ViewComponent'];
		$valueDescription = '';
		$required = ($xmlData['Required']) ? 1 : 0;
		
		if ($xmlData['ValueDescription']) {
			if (validateInputRecord($xmlData['ValueDescription'], 0, 'Type', $value)) {
				$valueDescription = '<Type>' . $value . '</Type>';
				for ($i = 1; $i < count($xmlData['ValueDescription']); $i++) {
					if (validateInputRecord($xmlData['ValueDescription'], $i, 'Value', $value)) {
						$valueDescription .= '<Value>' . $value . '</Value>';
					}
				}
			} else if (validateInputRecord($xmlData['ValueDescription'], 0, 'MinValue', $value)) {
				$valueDescription = '<MinValue>' . $value . '</MinValue>';
				if (validateInputRecord($xmlData['ValueDescription'], 1, 'MaxValue', $value)) {
					$valueDescription .= '<MaxValue>' . $value . '</MaxValue>';
				}
				if (validateInputRecord($xmlData['ValueDescription'], 2, 'Step', $value)) {
					$valueDescription .= '<Step>' . $value . '</Step>';
				}
			} else if (validateInputRecord($xmlData['ValueDescription'], 0, 'Accept', $value)) {
				$valueDescription = '<Accept>' . $value . '</Accept>';
				if (validateInputRecord($xmlData['ValueDescription'], 1, 'Folder', $value)) {
					$valueDescription .= '<Folder>' . $value . '</Folder>';
				}
			} else if (validateInputRecord($xmlData['ValueDescription'], 0, 'Base', $value)) {
				$valueDescription = '<Base>' . $value . '</Base>';
			}
		}
						
		mysql_query("INSERT INTO Dictionary (Type) VALUES (0)");
		$phraseId = mysql_insert_id();
		$languageId = $_SESSION['languageId'];
		$user = getUserId();
		$transDate = date('Y-m-d H:i:s');
						
		mysql_query("INSERT INTO PhraseTranslation (LanguageId, TextId, Translation, TranslateDate, TranslateBy) VALUES ($languageId, $phraseId, '$name', '$transDate', $user)");
						
		mysql_query("INSERT INTO Properties (NameDictionaryId, ValueType, ContentTypeId, ViewComponent, ValueDescription, Required) VALUES ($phraseId, $valueType, $contentTypeId, $viewComponent, '$valueDescription', $required)");
						
		$response = "<Result>OK</Result>";
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