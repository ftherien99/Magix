<?php
	require_once("CommonAction.php");

	class GameAjax extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {
			$data = [];
            $data["key"] = $_SESSION['key'];
			$data["type"] = $_POST["type"];
			$data["uid"] = $_POST["uid"];
			$data["targetuid"] = $_POST["euid"];

			$result  = "";
			$result =  parent::callAPI("games/action", $data);
			
			return compact("result");
	}
}
