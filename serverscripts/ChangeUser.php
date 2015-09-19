<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Database.php';
include 'Phrases.php';
include 'SessionValidation.php';
include 'XmlValidation.php';

if (validateInputData(array('SessionId', 'UserId', 'Address', 'Password', 'Phone', 'Username', 'Sex'))) {
	if (validateSession(null) && connectToDatabase() && validatePermission(2)) {
		$editBy = intval($_SESSION['userId']);
		$userId = intval($xmlData['UserId']);
		$address = safeToSql($xmlData['Address']);
		$encryptedPass = md5($xmlData['Password']);
		$phone = safeToSql($xmlData['Phone']);
		$username = safeToSql($xmlData['Username']);
		$sex = intval($xmlData['Sex']);
		$editDate = date('Y-m-d H:i:s');
		$queryResult = mysql_query("SELECT Id FROM Users WHERE UserName = '$username'");
		
		if ($queryResult) {
			if (mysql_num_rows($queryResult) == 1) {
				$row = mysql_fetch_array($queryResult);
				
				if ($row['Id'] != $userId) {
					$error = 'Exists';
				}
			}
		}

		if (!isset($error)) {
			if (mysql_query("UPDATE Users SET Address = '$address', Password = '$encryptedPass', Phone = '$phone', UserName = '$username', Sex = $sex, EditDate = '$editDate', EditBy = $editBy WHERE Id = $userId")) {
				$response = '<Result>OK</Result>';
				writeUserAction(2);
			} else {
				$error = 'Error updating user';
			}
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
