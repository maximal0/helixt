<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Database.php';
include 'SessionValidation.php';
include 'XmlValidation.php';

if (validateInputData(array('SessionId', 'Username', 'Password'))) {
	if (validateSession(null)) {
		if (connectToDatabase()) {
			$username = mysql_real_escape_string(stripslashes($xmlData['Username']));
			$sqlResult = mysql_query("SELECT Id, Password FROM Users WHERE UserName = '$username'");

			if ($sqlResult && mysql_num_rows($sqlResult) == 1) {
				$row = mysql_fetch_array($sqlResult);
				$encriptedPassword = $row['Password'];
				
				if ($encriptedPassword == md5($xmlData['Password'])) {
					$userId = $row['Id'];
					$_SESSION['userId'] = $userId;
					
					$sqlResult = mysql_query("SELECT GroupId FROM UserGroups WHERE UserId = $userId");
					if ($sqlResult && mysql_num_rows($sqlResult) > 0) {
						$i = 0;
						$array = null;
						while ($row = mysql_fetch_array($sqlResult)) {
							$array[$i] = $row;
							$i++;
						}
						$_SESSION['userGroups'] = $array;
					}
					$response = '<Result>OK</Result>';
					$currentDate = date('Y-m-d H:i:s');
					mysql_query("UPDATE Users SET LastAccess = '$currentDate' WHERE Id = $userId");
				}
			}

			if (!isset($response) && !isset($error)) {
				$error = 'Incorrect input data.';
			}
		} else {
			$error = 'Can not connect to the database.';
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
