<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Database.php';
include 'Phrases.php';
include 'SessionValidation.php';
include 'XmlValidation.php';

if (validateInputData(array('SessionId', 'Name', 'Address', 'Email', 'Phone', 'Sex', 'Username', 'Password'))) {
	if (validateSession(null) && validateUser() && connectToDatabase() && validatePermission(1)) {
		$createBy = getUserId();	
		$username = safeToSql($xmlData['Username']);
		$email = safeToSql($xmlData['Email']);
		$result = mysql_query("SELECT COUNT(*) AS Records FROM Users WHERE UserName = '$username' OR Email = '$email'");
		$row = mysql_fetch_array($result);
					
		if ($row['Records'] == 0) {
			$address = safeToSql($xmlData['Address']);
			$name = safeToSql($xmlData['Name']); 
			$password = md5($xmlData['Password']);
			$phone = safeToSql($xmlData['Phone']);
			$sex = intval($xmlData['Sex']);
			$createDate = date('Y-m-d H:i:s');
			
			mysql_query("INSERT INTO Users (FullName, Address, Email, Phone, Sex, UserName, Password, IsDeleted, CreateDate, CreateBy) VALUES ('$name', '$address', '$email', '$phone', $sex, '$username', '$password', 0, '$createDate', $createBy)");
			$userId = mysql_insert_id();
			$response = "<Result>$userId</Result>";
			writeUserAction(1);
		} else {
			$response = '<Result>Exists</Result>';
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
