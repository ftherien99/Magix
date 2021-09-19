<?php
	require_once("CommonAction.php");
	require_once("DAO/HistoryDAO.php");
	
	class AjaxAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {
			$data = [];
			$data["key"] = $_SESSION['key'];
			$username = $_SESSION['username'];

			$result  = "";
			$result =  parent::callAPI("games/state", $data);

			// envoyer les infos a la bd
			if($result == "LAST_GAME_WON"){
				$enemyName = $_POST['enemyName'];
				$winner = $username;
				HistoryDAO::sendStats($username, $enemyName, $winner);
			}
			else if($result == "LAST_GAME_LOST"){
				$enemyName = $_POST['enemyName'];
				$winner = $enemyName;
				HistoryDAO::sendStats($username, $enemyName, $winner);
			}

			return compact("result");
	}
}
