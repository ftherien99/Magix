<?php    
	require_once("AjaxAction.php");

	$action = new AjaxAction();
	$data =$action->execute();
	
	echo json_encode($data["result"]);