<?php
	require_once("action/GameAction.php");

	$action = new GameAction();
	$data = $action->execute();
	$key = $data['key'];
	
    require_once("partials/header.php")
?>
<script src="js/game.js"></script>
<body class="game-body">




<div class = "enemy-hud">
	<div class = "enemy-hand"></div>
	<div class = "enemy-heart">
		<h2 class = "enemy-hp"></h2>
	</div>

	<div class = "enemy-image"></div>

	<div class = "enemy-ink-ribbon">
		<h2 class = "enemy-mp"></h2>
	</div>

	<div class = "enemy-deck">
		<h2 class = enemy-deck-size></h2>
	</div>

	<div class = "enemy-info">
		<h2 class = "enemy-name"></h2>
		<h2 class = "enemy-class"></h2>
	</div>

</div>
<div class = "enemy-board"></div>
<div class = "board"></div>

<div class = "hourglass">
	<h2 class="time"></h2>
</div>

<iframe id = "chat" class="game-chat"  onload="applyStyles(this)"
        src= <?="https://magix.apps-de-cours.com/server/#/chat/".$key."/large"?>>
</iframe>

<div class = "player-hud">
	<div class = "hand"></div>
	<div class = "heart">
		<h2 class = "hp"></h2>
	</div>

	<div class = "ink-ribbon">
		<h2 class = "mp"></h2>
	</div>

	<div class = "deck">
		<h2 class = deck-size></h2>
	</div>

	<div class = "end-turn">
		<h2>END TURN</h2>
	</div>

	<div class = "hero-power">
		<h2>HERO POWER</h2>
	</div>

	<div class = "show-chat">
		<h2>CHAT</h2>
	</div>
	
</div>


</body>
