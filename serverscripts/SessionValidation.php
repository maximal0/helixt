<?php

function getLanguageId() {
	return $_SESSION['languageId'];
}

function getUserId() {
	return intval($_SESSION['userId']);
}

function getUserGroups() {
	if (array_key_exists('userGroups', $_SESSION)) {
		return $_SESSION['userGroups'];
	} else {
		return null;
	}
}

function validatePermission($actionId) {
	$groups = getUserGroups();
	if ($groups) {
		$groupsNum = count($groups);
		$str = "SELECT COUNT(*) AS Records FROM GroupPermissions Where ActionId = $actionId And (";
		for ($i = 0; $i < $groupsNum; $i++) {
			if ($i != $groupsNum - 1) {
				$str .= "GroupId = ". $groups[$i]['GroupId'] ." OR ";
			} else {
				$str .= "GroupId = ". $groups[$i]['GroupId'] .")";
			}
		}
		$sqlResult = mysql_query($str);
		$row = mysql_fetch_array($sqlResult);
		if ($row['Records'] > 0){
			return true;	
		}
	} 
	return false;
}

function validateSession($sId) {
	global $error;
	global $xmlData;

	session_write_close();
	$sId = $sId == null ? $xmlData['SessionId'] : $sId;
	session_id($sId);
	session_start();

	$returnValue = array_key_exists('sessionId', $_SESSION) && $_SESSION['sessionId'] == $sId;
	
	if (!$returnValue) {
		$error = 'Session expired.';
	}
	
	return $returnValue;
}

/*function validateUserType($userType) {
	return array_key_exists('userId', $_SESSION) && array_key_exists('userType', $_SESSION) && ((getUserType() == $userType) || (getUserType() == UserType::Administrator));
}*/

function validateUser() {
	return array_key_exists('userId', $_SESSION);
}

function writeUserAction($actionId) {
	$userId = getUserId();
	$createDate = date('Y-m-d H:i:s');
	mysql_query("INSERT INTO UserActions (UserId, ActionId, Date) VALUES ($userId, $actionId, '$createDate')");
}

?>
