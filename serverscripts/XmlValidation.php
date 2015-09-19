<?php

function getInputIntegerParameter($parameterName) {
	return intval(getInputParameter($parameterName));
}

function getInputParameter($parameterName) {
	global $xmlData;

	return $xmlData[$parameterName];
}

function parseInputXml() {
	global $error;

	$inputData = null;
	$rawData   = file_get_contents('php://input');

	if ($rawData) {
		$xmlReader = new XMLReader();
		
		$xmlReader->xml($rawData);
		$inputData = xmlToArray($xmlReader);
		$xmlReader->close();
	} else {
		$error = 'No input data.';
	}
	
	return $inputData;
}

function validateInputData($xmlTags) {
	global $error;
	global $xmlData;

	$data = parseInputXml();
	
    if (!isset($error)) {
		if ($data) {
			if (validateInputRecord($data, 0, 'Vtf', $elementVtf)) {
				foreach ($xmlTags as $i => $tag) {
					if (validateInputRecord($elementVtf, $i, $tag, $value)) {
						$xmlData[$tag] = $value;
					} else {
						$error = $tag . ' element expected.';
						break;
					}
				}
			} else {
				$error = 'Vtf element expected.';
			}
		} else {
			$error = 'No XML data.';
		}
	}

	return !isset($error);
}

function validateInputRecord($element, $index, $expected, &$value) {
	$result = false;
	
	if (isset($element[$index]) && isset($element[$index]['tag']) && $element[$index]['tag'] == $expected && isset($element[$index]['value'])) {
		$value  = $element[$index]['value'];
		$result = true;
	}
	
	return $result;
}

function xmlToArray($xml) {
    $tree = null;

    while($xml->read()) {
        switch ($xml->nodeType) {
            case XMLReader::END_ELEMENT: return $tree;
            case XMLReader::ELEMENT:
                $node = array('tag' => $xml->name, 'value' => $xml->isEmptyElement ? '' : xmlToArray($xml));
				
                if ($xml->hasAttributes) {
                    while($xml->moveToNextAttribute()) {
                        $node['attributes'][$xml->name] = $xml->value;
					}
				}
				
                $tree[] = $node;
				break;

            case XMLReader::TEXT:
            case XMLReader::CDATA:
                $tree .= $xml->value;
				break;
        }
	}

    return $tree;
}

?>
