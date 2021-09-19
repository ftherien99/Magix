<?php    
	require_once("GameAjax.php");

	$action = new GameAjax();
	$data =$action->execute();
	
	echo json_encode($data["result"]);