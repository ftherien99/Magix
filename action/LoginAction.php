<?php
    require_once("action/CommonAction.php");

    class LoginAction extends CommonAction {

        public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {
			$data = [];
			$validUser = TRUE;

			if(isset($_POST["username"]) and isset($_POST["password"])){
			
				$data["username"] = $_POST["username"];
				$data["password"] = $_POST["password"];
				$_SESSION['username'] = $_POST["username"]; // garder le username en memoire
			
			
			$result = parent::callAPI("signin", $data);
			
			if ($result == "INVALID_USERNAME_PASSWORD") {
				$validUser = FALSE;
			}
			else {
				// Pour voir les informations retournées : var_dump($result);exit;
				session_start();
				$key = $result->key;
				$_SESSION['key'] = $key;
				header("location:lobby.php");
				exit();
			}
		}
			return $validUser;
	}
		
}