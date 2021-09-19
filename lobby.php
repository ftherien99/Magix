<?php
	require_once("action/LobbyAction.php");

	$action = new LobbyAction();
	$data = $action->execute();
	$key = $data['key'];
	$user = $_SESSION["username"];
	
    require_once("partials/header.php")
?>

<script src="js/lobby.js"></script>
<body class="lobby-body">
<h2 class = "lobby-greetings">Welcome <?=$user?>!</h2>
<iframe class="lobby-chat" style="width:700px;height:240px;" onload="applyStyles(this)"
        src= <?="https://magix.apps-de-cours.com/server/#/chat/".$key?>>
</iframe>
<form action="lobby.php" method = "post">
	<button id = "history" type = "submit" name = "historique" class = "historique"><h2>HISTORY</h2></button>
</form>

<h2 class="text-door">PLAY</h2>
<form action="lobby.php" method = "post">
    <button type="submit" name="Deconnexion"><img src="img/dark_left.png" class="dark-left-img" id="left" alt=""></button>
</form>

<h2 class="text-right">PRACTICE</h2>
<form action="lobby.php" method = "post">
	<button type="submit" name = "Practice"><img src="img/dark_right.png" class="dark-right-img" id="right" alt=""></button>
</form>

<h2 class="text-left">QUIT</h2>
<form action="lobby.php" method = "post">
	<button type="submit" name = "Jouer"> <img src="img/porte-ouvert.png"  class="porte-ouvert-img" id="porte" alt=""></button>
</form>
</body>
</html>