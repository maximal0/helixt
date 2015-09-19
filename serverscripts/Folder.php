<?php
    
function getFolderPath($directParentId, $folderName) {
	$path = $_SERVER['DOCUMENT_ROOT']. "/HelixT/";
	$foldersName = array();
	while($directParentId != null && $directParentId != 1) {
		$result = mysql_query("SELECT * FROM Folders WHERE Id = $directParentId");
		$row = mysql_fetch_array($result);
		array_push($foldersName, $row["Name"]);
		$directParentId = $row["ParentId"];
	}
	$length = count($foldersName);
	for ($i = $length - 1; $i >= 0; $i--) {
		$path .= $foldersName[$i] . "/";
	}
	return $path . $folderName;
}
    
?>