<?php
	require_once("action/CommonAction.php");
	require_once("action/DAO/HistoryDAO.php");

	class HistoryAction extends CommonAction {

        public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {
			
			if(isset($_POST['lobby'])){
				header("location:lobby.php");
				exit();
			}

			$Info = HistoryDAO::getHistoryInfo();

			$sortedInfo = array_reverse($Info);

			for($i = 0; $i < 10; $i++){ // 10 dernieres parties
				$historyInfo[] = $sortedInfo[$i];
			}

			return compact("historyInfo");
			
	}
		
}