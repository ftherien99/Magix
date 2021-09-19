<?php
    require_once("action/CommonAction.php");

    class LobbyAction extends CommonAction {

        public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {
			$data = [];
			$data["key"] = $_SESSION['key'];
		

			if(isset($_POST['Deconnexion'])){
				$result = parent::callAPI("signout", $data);

				if($result == "SIGNED_OUT"){
					header("location:login.php");
					exit();
				}
				else if($result == "INVALID_KEY"){
					CommonAction::alert("Erreur, la cle est invalide");
				}
			}
			else if(isset($_POST['Practice'])){
				$data["type"] = "TRAINING";
				$result = parent::callAPI("games/auto-match", $data);

				if($result == "JOINED_TRAINING"){
					header("location:game.php");
					exit();
				}
				else if($result == "INVALID_GAME_TYPE"){
					CommonAction::alert("Le type de jeu existe pas!");
				}
			}
			else if(isset($_POST['Jouer'])){
				$data["type"] = "PVP";
				$result = parent::callAPI("games/auto-match", $data);

				if($result == "JOINED_PVP" || $result == "CREATED_PVP"){
					header("location:game.php");
					exit();
				}
				else if($result == "INVALID_GAME_TYPE"){
					CommonAction::alert("Le type de jeu n'existe pas!");
				}
			}
			else if (isset($_POST['historique'])) {
				header("location:history.php");
				exit();
			}

			return $data;
	}
		
}