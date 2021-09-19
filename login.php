<?php
	require_once("action/LoginAction.php");

	$action = new LoginAction();
	$data = $action->execute();

    require_once("partials/header.php")
?>
<script src="js/sprites/rain.js"></script>
<script src="js/sprites/ghost.js"></script>
<script src="js/TiledImage.js"></script>
<script src="js/login.js"></script>
<body class="login-body">
    <div class="login-form">
        <h2 class="login-h2">SPOOKY'S MAGIX MANSION</h2>
        <form action="login.php" method="post" >
            <div>
                <input type="text" name="username" id="username" placeholder="Username">
            </div>
            <div>
                <input type="password" name="password" id="password" placeholder="Password">
            </div>
            <button class="login-button">Login</button>
            <?php
            if($data == FALSE){
                ?>
                <p class="login-p">Erreur dans l'identifiant, veuillez reessayer...</p>
                <?php
            }
        ?>
        </form>
    </div>
    <canvas id="canvas" width="2550" height = "1220"></canvas>
</body>
</html>