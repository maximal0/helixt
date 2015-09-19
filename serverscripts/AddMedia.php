<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Database.php';
include 'Phrases.php';
include 'SessionValidation.php';
include 'XmlValidation.php';

if ($_FILES["attachment"]["error"] == 0) {
	if (($_FILES["attachment"]["type"] == "image/gif")
		|| ($_FILES["attachment"]["type"] == "image/jpeg")
		|| ($_FILES["attachment"]["type"] == "image/jpg")
		|| ($_FILES["attachment"]["type"] == "image/pjpeg")
		|| ($_FILES["attachment"]["type"] == "image/x-png")
		|| ($_FILES["attachment"]["type"] == "image/png")
		|| ($_FILES["attachment"]["type"] == "image/tif")
		|| ($_FILES["attachment"]["type"] == "image/tiff")
		|| ($_FILES["attachment"]["type"] == "image/bmp")
		|| ($_FILES["attachment"]["type"] == "video/mp4")
		|| ($_FILES["attachment"]["type"] == "video/webm")
		|| ($_FILES["attachment"]["type"] == "video/ogg")
		|| ($_FILES["attachment"]["type"] == "audio/mpeg")
		|| ($_FILES["attachment"]["type"] == "audio/ogg")
		|| ($_FILES["attachment"]["type"] == "audio/wav")) {
			$properties = explode(";", $_POST['Auxiliary']);
			if (validateSession($properties[3]) && connectToDatabase() && validateUser() && validatePermission(24)) {  
					$folder = intval($properties[0]);
					$folderName = 'media';
					$result = mysql_query("SELECT * FROM Folders WHERE Id = $folder");
					if ($result) {
						$row = mysql_fetch_array($result);
						$folderName = $row['Name'];
						while ($row['ParentId'] != null && $row['ParentId'] != 1) {
							$pId = $row['ParentId'];
							$result = mysql_query("SELECT * FROM Folders WHERE Id = $pId");
							$row = mysql_fetch_array($result);
							$folderName = $row['Name'] . '/' . $folderName;
						}
					}
					$code = guid();
					$code .= '.'. end(explode(".", $_FILES["attachment"]["name"]));
					if ($folderName == 'Root') {
						$url = $code;
					} else {
						$url = $folderName . '/' . $code;
					}
					$size = ($_FILES["attachment"]["size"]/1024). ' KB';
					if (move_uploaded_file($_FILES["attachment"]["tmp_name"], '../'. $url)) {
						$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
						$url = $protocol . $_SERVER['HTTP_HOST'] . '/HelixT/' . $url;
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
									mysql_query("INSERT INTO PhraseTranslation (LanguageId, TextId, Translation, TranslateDate, TranslateBy) VALUES ($languageId, $textId, '$properties[1]', '$createDate', $userId)");
									
									mysql_query("INSERT INTO ContentProperties (ContentId, PropertyId, ValueDictionaryId) VALUES ($id, $propertyId, $textId)");
									
								} else if (getPhrase($row1['NameDictionaryId'], 1) == 'Media Type') {
									$type = $_FILES["attachment"]["type"];
									mysql_query("INSERT INTO ContentProperties (ContentId, PropertyId, Value) VALUES ($id, $propertyId, '$type')");
									
								} else if (getPhrase($row1['NameDictionaryId'], 1) == 'Code') {
									mysql_query("INSERT INTO ContentProperties (ContentId, PropertyId, Value) VALUES ($id, $propertyId, '$code')");
									
								} else if (getPhrase($row1['NameDictionaryId'], 1) == 'Media URL') {
									mysql_query("INSERT INTO ContentProperties (ContentId, PropertyId, Value) VALUES ($id, $propertyId, '$url')");
									
								} else if (getPhrase($row1['NameDictionaryId'], 1) == 'Media Description') {
									mysql_query("INSERT INTO Dictionary () VALUES ()");
									$textId = mysql_insert_id();
									mysql_query("INSERT INTO PhraseTranslation (LanguageId, TextId, Translation, TranslateDate, TranslateBy) VALUES ($languageId, $textId, '$properties[2]', '$createDate', $userId)");
									
									mysql_query("INSERT INTO ContentProperties (ContentId, PropertyId, ValueDictionaryId) VALUES ($id, $propertyId, $textId)");
									
								} else if (getPhrase($row1['NameDictionaryId'], 1) == 'Folder') {
									mysql_query("INSERT INTO ContentProperties (ContentId, PropertyId, Value) VALUES ($id, $propertyId, '$folder')");
									
								} else if (getPhrase($row1['NameDictionaryId'], 1) == 'Media File Size') {
									mysql_query("INSERT INTO ContentProperties (ContentId, PropertyId, Value) VALUES ($id, $propertyId, '$size')");
									
								}
								writeUserAction(28);
							}
						}
						$response = "File stored successfully.";
						writeUserAction(24);
					} else {
						$error = 'Error: Could not store file.';
					}
			} else {
				$error = 'Error: Could not establish connection to server or you do not have permission.';
			}
	} else {
		$error = 'Error: Invalid file type.';
	}
} else {
	$error = 'Upload error: '.$_FILES["attachment"]["error"].'.';
}

if (isset($error)) {
	echo $error;
} else if (isset($response)) {
	echo $response;
} else {
	echo 'Error: Unexpected server error.';
}

?>