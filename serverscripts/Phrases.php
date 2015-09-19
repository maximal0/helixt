<?php

function getDefaultPhrase ($phraseId) {
	$result = mysql_query('SELECT Translation FROM PhraseTranslation WHERE LanguageId = 1 AND TextId = ' . $phraseId);

	if ($result && mysql_num_rows($result) > 0) {
		$row = mysql_fetch_array($result);
		$phrase = $row['Translation'];
	} else {
		$phrase = '';
	}

	return $phrase;
}

function getPhrase ($phraseId, $languageId) {
	$result = mysql_query("SELECT Translation FROM PhraseTranslation WHERE TextId = $phraseId AND LanguageId = $languageId");
		
	if ($result && mysql_num_rows($result) > 0) {
		$row = mysql_fetch_array($result);
		$phrase = $row['Translation'];
	} else if ($languageId != 1) {
		$phrase = getDefaultPhrase($phraseId);
	} else {
		$phrase = '';
	}

	return $phrase;
}

?>
