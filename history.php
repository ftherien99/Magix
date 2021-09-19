<?php
	require_once("action/HistoryAction.php");

	$action = new HistoryAction();
	$data = $action->execute();
	
    require_once("partials/header.php")
?>

<body class = "history-body">
    <form action="history.php" method = "post">
        <button type = "submit" name = "lobby" class = "backLobby"><h2>GO BACK TO LOBBY</h2></button>
    </form>
    <div class = "history-title">
            <div class="history-title-h2">
                <p>PLAYER</p>
            </div>
            <div class="history-title-h2">
                <p>OPPONENT</p>
            </div>
            <div class="history-title-h2">
                <p>WINNER</p>
            </div>
            <div class="history-title-h2">
                <p>DATE</p>
            </div>
    </div>
    <div class = "history-div">
        <ul>
            <?php   
                foreach($data["historyInfo"] as $answers){
                    ?>
                    <li class = "history-game">
                        <div class="history-h2">
                            <p><?= $answers["playername"] ?></p>
                        </div>
                        <div class="history-h2">
                            <p><?= $answers["enemyname"] ?></p>
                        </div>
                        <div class="history-h2">
                            <p><?= $answers["winner"] ?></p>
                        </div>
                        <div class="history-h2">
                            <p><?= $answers["date"] ?></p>
                        </div>
                </li>
                    <?php
                }
            ?>
        </ul>
        </div>
</body>
</html>