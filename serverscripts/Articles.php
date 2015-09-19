<?php

function getArticle ($textId, $languageId) {
	$result = mysql_query("SELECT Translation FROM ContentTranslation WHERE TextId = $textId AND LanguageId = $languageId");
		
	if ($result && mysql_num_rows($result) > 0) {
		$row = mysql_fetch_array($result);
		$article = $row['Translation'];
	} else if ($languageId != 1) {
		$article = getDefaultArticle($textId);
	} else {
		$article = '';
	}

	return $article;
}

function getDefaultArticle ($textId) {
	$result = mysql_query('SELECT Translation FROM ContentTranslation WHERE LanguageId = 1 AND TextId = ' . $textId);

	if ($result && mysql_num_rows($result) > 0) {
		$row = mysql_fetch_array($result);
		$article = $row['Translation'];
	} else {
		$article = '';
	}

	return $article;
}

?>