<?php

include "Database.php";

$sessionId = md5(rand() . ' ' . microtime());
$xmlLanguages = '';

session_id($sessionId);
session_start();

$_SESSION['sessionId'] = $sessionId;
$_SESSION['time'] = time();

if (connectToDatabase()) {
	$result = mysql_query('SELECT * FROM Languages WHERE Active = 1');
	
	if ($result && mysql_num_rows($result) > 0) {
		while ($row = mysql_fetch_array($result)) {
			$xmlLanguages .= '<Language><Id>' . $row['Id'] . '</Id><Path>images/flags/' . $row['Code'] . '.png</Path><Code>' . $row['Code'] . '</Code></Language>';
		}
	}
}

header('Content-Type: text/xml; charset=utf-8');

echo '<?xml version="1.0" encoding="utf-8"?>' . "\n";
echo '<Vtf><SessionId>' . $sessionId . '</SessionId>' . $xmlLanguages . '</Vtf>';

?>
