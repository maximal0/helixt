<?php 
	
error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Database.php';
include 'Phrases.php';
include 'SessionValidation.php';
include 'XmlValidation.php';

if (isset($GLOBALS["HTTP_RAW_POST_DATA"])) {
	$properties = explode(",", $GLOBALS["HTTP_RAW_POST_DATA"]);
	$c = count($properties);
	if (validateSession($properties[$c - 1]) && connectToDatabase() && validateUser() && validatePermission(24) && validatePermission(25)) {
		if ($c == 4) {
			//$url = $properties[0];
			$urlSplit = explode('/', $properties[0]);
			$unencodedImageData = base64_decode($properties[2]);
			$fp = fopen( '../media/' . $urlSplit[count($urlSplit) - 1], 'wb' );
			fwrite( $fp, $unencodedImageData);
	 		fclose( $fp );
			$response = "File stored successfully.";
		} else if ($c == 5) {
			$title = $properties[0];
			$desc = $properties[1];
			$unencodedImageData = base64_decode($properties[3]);
			$code = guid() .'.png';
			$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
			$url = $protocol . $_SERVER['HTTP_HOST'] . '/HelixT/media/' . $code;
			
			if ($fp = fopen( $url, 'wb' )) {
				fwrite( $fp, $unencodedImageData);
	 			fclose( $fp );
				$userId = getUserId();
				$createDate = date('Y-m-d H:i:s');
				mysql_query("INSERT INTO Contents (TypeId, CreateDate, CreateBy, IsDeleted) VALUES (1, '$createDate', $userId, 0)");
				$id = mysql_insert_id();
				$languageId = $_SESSION['languageId'];
							
				$result1 = mysql_query('SELECT * FROM Properties Where ContentTypeId = 1');
				if ($result1 && mysql_num_rows($result1) > 0) {
					while($row1 = mysql_fetch_array($result1)) {
						$propertyId = intval($row1['Id']);
									
						if (getPhrase($row1['NameDictionaryId'], 1) == 'Media Title') {
							mysql_query("INSERT INTO Dictionary () VALUES ()");
							$textId = mysql_insert_id();
							mysql_query("INSERT INTO PhraseTranslation (LanguageId, TextId, Translation, TranslateDate, TranslateBy) VALUES ($languageId, $textId, '$title', '$createDate', $userId)");
										
							mysql_query("INSERT INTO ContentProperties (ContentId, PropertyId, ValueDictionaryId) VALUES ($id, $propertyId, $textId)");
										
						} else if (getPhrase($row1['NameDictionaryId'], 1) == 'Media Type') {
							$type = $_FILES["attachment"]["type"];
							mysql_query("INSERT INTO ContentProperties (ContentId, PropertyId, Value) VALUES ($id, $propertyId, 'image/png')");
										
						} else if (getPhrase($row1['NameDictionaryId'], 1) == 'Code') {
							mysql_query("INSERT INTO ContentProperties (ContentId, PropertyId, Value) VALUES ($id, $propertyId, '$code')");
										
						} else if (getPhrase($row1['NameDictionaryId'], 1) == 'Media URL') {
							mysql_query("INSERT INTO ContentProperties (ContentId, PropertyId, Value) VALUES ($id, $propertyId, '$url')");
										
						} else if (getPhrase($row1['NameDictionaryId'], 1) == 'Media Description') {
							mysql_query("INSERT INTO Dictionary () VALUES ()");
							$textId = mysql_insert_id();
							mysql_query("INSERT INTO PhraseTranslation (LanguageId, TextId, Translation, TranslateDate, TranslateBy) VALUES ($languageId, $textId, '$desc', '$createDate', $userId)");
										
							mysql_query("INSERT INTO ContentProperties (ContentId, PropertyId, ValueDictionaryId) VALUES ($id, $propertyId, $textId)");
										
						} else if (getPhrase($row1['NameDictionaryId'], 1) == 'Folder') {
							mysql_query("INSERT INTO ContentProperties (ContentId, PropertyId, Value) VALUES ($id, $propertyId, '2')");
										
						} else if (getPhrase($row1['NameDictionaryId'], 1) == 'Media File Size') {
							mysql_query("INSERT INTO ContentProperties (ContentId, PropertyId, Value) VALUES ($id, $propertyId, 'NaN')");
										
						}
						writeUserAction(28);
					}
				}
				$response = "File stored successfully.";
				writeUserAction(24);
			} else {
				$error = 'Error: Could not store file.';
			}
		}
	} else {
		$error = 'Error: Could not establish connection to server or you do not have permission.';
	}	
}

?>