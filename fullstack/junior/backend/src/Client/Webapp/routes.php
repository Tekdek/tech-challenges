<?php

use Symfony\Component\HttpFoundation\Request;

$app->get('/api/surveys', function () use ($app) {

	$result = array();

	// loop over json files
	foreach (scandir(ROOT_PATH."/data/") as $file) {
		// check if file is JSON
		if (pathinfo($file, PATHINFO_EXTENSION) == "json") {

			// get text from JSON file 
	    	$string = file_get_contents(ROOT_PATH."/data/".$file);
			$json_a = json_decode($string, true);
			
			// get Survey Infos and put it in an array
			$result[] = $json_a["survey"];

		}
	}

	// delete duplicate entries
	$result = array_map("unserialize", array_unique(array_map("serialize", $result)));
	// delete indexes
	$result = array_values($result);

    return $app->json($result);
		})->bind('surveys');

