<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Database.php';
include 'SessionValidation.php';

if ($_FILES["attachment"]["error"] == 0) {
		$properties = explode(";", $_POST['Auxiliary']);
		if (validateSession($properties[1]) && connectToDatabase() && validateUser() && validatePermission(24)) {
				$folderId = intval($properties[0]);
				$folderName = '';
				$result = mysql_query("SELECT * FROM Folders WHERE Id = $folderId");
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
				$url = '';
				if ($folderName == 'Root') {
					$url = $code;
				} else {
					$url = $folderName . '/' . $code;
				}
				
				if (move_uploaded_file($_FILES["attachment"]["tmp_name"], '../'. $url)) {
					$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
					$url = $protocol . $_SERVER['HTTP_HOST'] . '/HelixT/' . $url;
					$response = "<URL>$url</URL>";
				} else {
					$error = '<Error>Could not store file</Error>';
				}
			} else {
				$error = '<Error>Could not establish connection to server or you do not have permission</Error>';
			}
} else {
	$error = '<Error>'.$_FILES["attachment"]["error"].'</Error>';
}

if (isset($error)) {
	echo '<Vtf>' . $error . '</Vtf>';
} else if (isset($response)) {
	echo '<Vtf>' . $response . '</Vtf>';
} else {
	echo '<Vtf><Error>Unexpected server error</Error></Vtf>';
}

?>