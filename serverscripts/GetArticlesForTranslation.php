<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'Database.php';
include 'SessionValidation.php';
include 'XmlValidation.php';

if (validateInputData(array('SessionId', 'Id', 'From', 'To', 'PropertyId'))) {
	if (validateSession(null) && validateUser() && connectToDatabase()) {
		$id = intval($xmlData['Id']);
		$languageFrom = intval($xmlData['From']);
		$languageTo = intval($xmlData['To']);
		$propertyId = intval($xmlData['PropertyId']);
		
		if ($propertyId == 0) {
			$result1 = mysql_query("SELECT ValueDictionaryId FROM ContentProperties WHERE ContentId = $id AND PropertyId = 10");
			$result2 = mysql_query("SELECT ValueDictionaryId FROM ContentProperties WHERE ContentId = $id AND PropertyId = 13");
			
			if ($result1 && mysql_num_rows($result1) > 0 && $result2 && mysql_num_rows($result2) > 0) {
				$row = mysql_fetch_array($result1);
				$titleTextId = intval($row['ValueDictionaryId']);
				
				$row = mysql_fetch_array($result2);
				$articleTextId = intval($row['ValueDictionaryId']);
				
				$result1 = mysql_query("SELECT Translation FROM PhraseTranslation WHERE LanguageId = $languageFrom AND TextId = $titleTextId");
				$result2 = mysql_query("SELECT Translation FROM PhraseTranslation WHERE LanguageId = $languageTo AND TextId = $titleTextId");
				if ($result1 && mysql_num_rows($result1) > 0) {
					$row = mysql_fetch_array($result1);
					$titleFrom = $row['Translation'];
				} else {
					$titleFrom = '';
				}
					
				if ($result2 && mysql_num_rows($result2) > 0) {
					$row = mysql_fetch_array($result2);
					$titleTo = $row['Translation'];
				} else {
					$titleTo = '';
				}
					
					
				$result1 = mysql_query("SELECT Translation FROM ContentTranslation WHERE TextId = $articleTextId AND LanguageId = $languageFrom");
				$result2 = mysql_query("SELECT Translation FROM ContentTranslation WHERE TextId = $articleTextId AND LanguageId = $languageTo");
					
				if ($result1 && mysql_num_rows($result1) > 0) {
					$row = mysql_fetch_array($result1);
					$articleFrom = $row['Translation'];
				} else {
					$articleFrom = '';
				}
						
				if ($result2 && mysql_num_rows($result2) > 0) {
					$row = mysql_fetch_array($result2);
					$articleTo = $row['Translation'];
				} else {
					$articleTo = '';
				}
						
						
				$response = "<TitleTextId>$titleTextId</TitleTextId>";
				$response .= "<ArticleTextId>$articleTextId</ArticleTextId>";
				$response .= "<TitleFrom>$titleFrom</TitleFrom>";
				$response .= "<TitleTo>$titleTo</TitleTo>";
				$response .= "<ArticleFrom><![CDATA[$articleFrom]]></ArticleFrom>";
				$response .= "<ArticleTo><![CDATA[$articleTo]]></ArticleTo>";
			} else {
				$error = 'Database error.';
			}
		} else {
			$result1 = mysql_query("SELECT ValueDictionaryId FROM ContentProperties WHERE ContentId = $id AND PropertyId = $propertyId");
			
			if ($result1 && mysql_num_rows($result1) > 0) {
				$row = mysql_fetch_array($result1);
				$articleTextId = intval($row['ValueDictionaryId']);	
					
				$result1 = mysql_query("SELECT Translation FROM ContentTranslation WHERE TextId = $articleTextId AND LanguageId = $languageFrom");
				$result2 = mysql_query("SELECT Translation FROM ContentTranslation WHERE TextId = $articleTextId AND LanguageId = $languageTo");
					
				if ($result1 && mysql_num_rows($result1) > 0) {
					$row = mysql_fetch_array($result1);
					$articleFrom = $row['Translation'];
				} else {
					$articleFrom = '';
				}
						
				if ($result2 && mysql_num_rows($result2) > 0) {
					$row = mysql_fetch_array($result2);
					$articleTo = $row['Translation'];
				} else {
					$articleTo = '';
				}
						
						
				$response = "<TitleTextId></TitleTextId>";
				$response .= "<ArticleTextId>$articleTextId</ArticleTextId>";
				$response .= "<TitleFrom></TitleFrom>";
				$response .= "<TitleTo></TitleTo>";
				$response .= "<ArticleFrom><![CDATA[$articleFrom]]></ArticleFrom>";
				$response .= "<ArticleTo><![CDATA[$articleTo]]></ArticleTo>";
			} else {
				$error = 'Database error.';
			}
		}
	} else {
		$error = 'Invalid session.';
	}
} else {
	$error = 'Invalid input.';
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