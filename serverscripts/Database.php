<?php

function connectToDatabase() {
	global $error;

	$dataBase = mysql_connect("localhost", "root", "");
	$connected = false;

	if ($dataBase) {
		mysql_set_charset('utf8', $dataBase);

		if (mysql_select_db("helixtdb", $dataBase)) {
			$connected = true;
		}
	}

	if (!$connected) {
		$error = 'Can not connect to the database.';
	}

	return $connected;
}

function decodeAccented($encodedValue) {
	return preg_replace_callback('/&\w(acute|uml|tilde);/', create_function('$m', 'return html_entity_decode($m[0], ENT_QUOTES, "UTF-8");'), $encodedValue);
}

function safeFromSql($str) {
	return decodeAccented(htmlentities(stripslashes($str), ENT_QUOTES, 'UTF-8'));
}

function safeToSql($str) {
	return mysql_real_escape_string(html_entity_decode($str, ENT_QUOTES, 'UTF-8'));
}

function guid(){
    mt_srand((double)microtime()*10000);//optional for php 4.2.0 and up.
    return strtoupper(md5(uniqid(rand(), true)));
}


?>
