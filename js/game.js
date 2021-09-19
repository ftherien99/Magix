let yourTurn = null;
let parentHand = null;
let parentNode = null;
let parentOpponentBoard = null;
let parentMyBoard= null;
let buttonAction = null;
let uid = null;
let ennemiUID = null;
let isCardAttacking = false;
let myHand = [];
let opponentBoard = [];
let myBoard = [];
let isWaitingSet = false;  // si le message waiting est apparu 
let isWaitingDeleted = false;
let errorMessage = null;
let error = null;
let isIntroDeleted = false;
let isChatHidden = false;
let areButtonsClicked = false;  // ne pas refaire les addEventListeners
let enemyName = null;
let isGameOverShown = false;
let isHeroPowerUsed = false;


window.addEventListener("load", () => {

    // boutons end-turn/hero-power
    document.querySelector(".end-turn").addEventListener("click", () =>{
    
        document.querySelector(".end-turn").style.opacity = 0.5;
        buttonAction = "END_TURN";
        gameAction();
        buttonAction = "";
    })

  

    document.querySelector(".hero-power").addEventListener("click", () =>{
        document.querySelector(".hero-power").style.opacity = 0.5;
        isHeroPowerUsed = true;
        buttonAction = "HERO_POWER";
        gameAction();
        buttonAction = "";
    })


    

    setTimeout(state, 1000); // Appel initial (attendre 1 seconde)
});



const state = () => {
    let formData = new FormData();
    formData.append("enemyName", enemyName);

    fetch("action/AjaxState.php", {   // Il faut créer cette page et son contrôleur appelle 
        method : "POST",       // l’API (games/state)
        credentials: "include",
        body: formData
    })
.then(response => response.json())
.then(data => {
    console.log(data); // contient les cartes/état du jeu.

if(data != "LAST_GAME_WON" && data != "LAST_GAME_LOST" && data != "WAITING"){

    enemyName = data["opponent"]["username"];  // pour la bd
    

    if(isWaitingDeleted == false){ // va enlever le text "waiting for opponent"
        if(document.querySelector(".waiting-text") != null){
            document.querySelector(".game-body").removeChild(document.querySelector(".waiting-text"));
            isWaitingDeleted = true;
        }
    }
   
    // phrases d'introduction
    if(isIntroDeleted == false){
        let intro = document.createElement("h1");
        intro.className = "intro-message";
        intro.innerText = data["welcomeText"]

        let enemyIntro = document.createElement("h1");
        enemyIntro.className = "enemy-intro-message";
        enemyIntro.innerText = data["opponent"]["welcomeText"];

        document.querySelector(".game-body").appendChild(intro);
        document.querySelector(".game-body").appendChild(enemyIntro);

        // faire disparaitre les phrases apres 2 secondes
        setTimeout(() => {
                
            document.querySelector(".game-body").removeChild(intro);
            document.querySelector(".game-body").removeChild(enemyIntro);
            isIntroDeleted = true;
            
        }, 2000);
    

    }

    // statistics des joueurs
    document.querySelector(".time").innerText = data["remainingTurnTime"];
    document.querySelector(".hp").innerText = data["hp"];
    document.querySelector(".mp").innerText = data["mp"];
    document.querySelector(".enemy-hp").innerText = data["opponent"]["hp"];
    document.querySelector(".enemy-mp").innerText = data["opponent"]["mp"];
    document.querySelector(".deck-size").innerText = data["remainingCardsCount"];
    document.querySelector(".enemy-deck-size").innerText = data["opponent"]["remainingCardsCount"];
    document.querySelector(".enemy-name").innerText = data["opponent"]["username"];
    document.querySelector(".enemy-class").innerText = data["opponent"]["heroClass"];
  
    // cartes dans la main de l'ennemi
    parentNode = document.querySelector(".enemy-hand");
    while(parentNode.firstChild){
        parentNode.removeChild(parentNode.lastChild);
    }

    for(let i = 0; i < data["opponent"]["handSize"]; i++){
        let node = document.createElement("div");
        node.className = "enemy-card";
        parentNode.appendChild(node);
        
    }
    

    // afficher les cartes dans la main du joueur
    parentHand = document.querySelector(".hand");
    while(parentHand.firstChild){
        parentHand.removeChild(parentHand.lastChild);
    }

    myHand = data["hand"];

    for(let i = 0; i < myHand.length; i++){  
            let card = document.createElement("div");
            card.className = "card";
            card.id = "card" + i;

            card.setAttribute("uid", myHand[i].uid);

            let cardImg = document.createElement("div");
            cardImg.className = "card-img"

            if(myHand[i].cost <= 3){
                cardImg.style.backgroundImage = "url(img/card-img3.jpg)";
            }
            else if(myHand[i].cost <= 6){
                cardImg.style.backgroundImage = "url(img/card-img1.png)"; 
            }
            else{
                cardImg.style.backgroundImage = "url(img/card-img1.png)"; 
            }
            

            let cardCost = document.createElement("div");
            cardCost.className = "card-cost"

            let cardCostText = document.createElement("h2");
            cardCostText.className = "card-cost-text";
            cardCostText.innerText = myHand[i].cost;

            let cardTxt = document.createElement("div");
            cardTxt.className = "card-text";

            let cardText = document.createElement("h3");
            cardText.innerText = myHand[i].mechanics;

            let cardAP = document.createElement("div");
            cardAP.className = "card-ap"

            let cardApText = document.createElement("h2");
            cardApText.className = "card-ap-text";
            cardApText.innerText = myHand[i].atk;

            let cardHP = document.createElement("div");
            cardHP.className = "card-hp"

            let cardHpText = document.createElement("h2");
            cardHpText.className = "card-hp-text";
            cardHpText.innerText = myHand[i].baseHP;

            parentHand.appendChild(card);

            card.appendChild(cardCost);
            cardCost.appendChild(cardCostText);

            card.appendChild(cardImg);

            card.appendChild(cardTxt);
            cardTxt.appendChild(cardText);

            card.appendChild(cardHP);
            cardHP.appendChild(cardHpText);

            card.appendChild(cardAP);
            cardAP.appendChild(cardApText);


            if(cardCostText.innerText <= data["mp"] && data["yourTurn"] == true){
                card.style.border = "thin solid green";
            }


    }

    // afficher le board du joueur
    myBoard = data["board"];
    parentMyBoard = document.querySelector(".board");

    while(parentMyBoard.firstChild){
        parentMyBoard.removeChild(parentMyBoard.lastChild);
    }

    for(let i = 0; i < myBoard.length; i++){  
        let card = document.createElement("div");
        card.className = "card";

        card.id = "boardCard" + i;

        if(myBoard[i].state != "SLEEP" && data["yourTurn"] == true){
            card.style.border = "thin solid green";
        }

        card.setAttribute("uid", myBoard[i].uid);

        let cardImg = document.createElement("div");
        cardImg.className = "card-img"

        if(myBoard[i].cost <= 3){
            cardImg.style.backgroundImage = "url(img/card-img3.jpg)"; 
        }
        else if(myBoard[i].cost <= 6){
            cardImg.style.backgroundImage = "url(img/card-img1.png)";
        }
        else{
            cardImg.style.backgroundImage = "url(img/card-img1.png)"; 
        }

        let cardCost = document.createElement("div");
        cardCost.className = "card-cost"

        let cardCostText = document.createElement("h2");
        cardCostText.className = "card-cost-text";
        cardCostText.innerText = myBoard[i].cost;

        let cardTxt = document.createElement("div");
        cardTxt.className = "card-text";

        let cardText = document.createElement("h3");
        cardText.innerText = myBoard[i].mechanics;

        let cardAP = document.createElement("div");
        cardAP.className = "card-ap"

        let cardApText = document.createElement("h2");
        cardApText.className = "card-ap-text";
        cardApText.innerText = myBoard[i].atk;

        let cardHP = document.createElement("div");
        cardHP.className = "card-hp"

        let cardHpText = document.createElement("h2");
        cardHpText.className = "card-hp-text";
        cardHpText.innerText = myBoard[i].hp;

        parentMyBoard.appendChild(card);
        card.appendChild(cardCost);
        cardCost.appendChild(cardCostText);

        card.appendChild(cardImg);

        card.appendChild(cardTxt);
        cardTxt.appendChild(cardText);

        card.appendChild(cardHP);
        cardHP.appendChild(cardHpText);

        card.appendChild(cardAP);
        cardAP.appendChild(cardApText);



}

    // afficher le board ennemi
    opponentBoard = data["opponent"]["board"];
    parentOpponentBoard = document.querySelector(".enemy-board");

    while(parentOpponentBoard.firstChild){
        parentOpponentBoard.removeChild(parentOpponentBoard.lastChild);
    }

    for(let i = 0; i < opponentBoard.length; i++){  
        let card = document.createElement("div");
        card.className = "card";

        card.id = "opponentBoardCard" + i;

        card.setAttribute("ennemiUID", opponentBoard[i].uid);

        let cardImg = document.createElement("div");
        cardImg.className = "card-img"

        
        if(opponentBoard[i].cost <= 3){
            cardImg.style.backgroundImage = "url(img/card-img3.jpg)"; 
        }
        else if(opponentBoard[i].cost <= 6){
            cardImg.style.backgroundImage = "url(img/card-img2.png)"; 
        }
        else{
            cardImg.style.backgroundImage = "url(img/card-img1.png)"; 
        }

        let cardCost = document.createElement("div");
        cardCost.className = "card-cost"

        let cardCostText = document.createElement("h2");
        cardCostText.className = "card-cost-text";
        cardCostText.innerText = opponentBoard[i].cost;

        let cardTxt = document.createElement("div");
        cardTxt.className = "card-text";

        let cardText = document.createElement("h3");
        cardText.innerText = opponentBoard[i].mechanics;

        let cardAP = document.createElement("div");
        cardAP.className = "card-ap"

        let cardApText = document.createElement("h2");
        cardApText.className = "card-ap-text";
        cardApText.innerText = opponentBoard[i].atk;

        let cardHP = document.createElement("div");
        cardHP.className = "card-hp"

        let cardHpText = document.createElement("h2");
        cardHpText.className = "card-hp-text";
        cardHpText.innerText = opponentBoard[i].hp;

        if(opponentBoard[i].mechanics[0] == "Taunt" || opponentBoard[i].mechanics[1] == "Taunt"){
            card.style.border = "thick solid red";
        }

        parentOpponentBoard.appendChild(card);
        card.appendChild(cardCost);
        cardCost.appendChild(cardCostText);

        card.appendChild(cardImg);

        card.appendChild(cardTxt);
        cardTxt.appendChild(cardText);

        card.appendChild(cardHP);
        cardHP.appendChild(cardHpText);

        card.appendChild(cardAP);
        cardAP.appendChild(cardApText);

}

    
   

    // bouton pour montrer le chat
    if(isChatHidden == false){
        document.querySelector(".show-chat").addEventListener("click", () =>{
            document.querySelector(".show-chat").style.opacity = 0.5;
            document.getElementById("chat").style.visibility = "hidden";
            isChatHidden = true;
        }) 
        
    }
    else{
        document.querySelector(".show-chat").addEventListener("click", () =>{
            document.querySelector(".show-chat").style.opacity = 1;
            document.getElementById("chat").style.visibility = "visible";
            isChatHidden = false;
        })
       
    }
    

    if(data["yourTurn"] == false){
        document.querySelector(".end-turn").style.opacity = 0.5;
        document.querySelector(".hero-power").style.opacity = 0.5;
        isHeroPowerUsed = false;
        enemyHeroClick = false;
        areButtonsClicked = false;
        
    }
    else{
        document.querySelector(".end-turn").style.opacity = 1;

        if(isHeroPowerUsed == false && data["mp"] >= 2){
            document.querySelector(".hero-power").style.opacity = 1;
        }
        

        // placer une carte sur le board
        let handCount = parentHand.childElementCount;
        for(let i = 0; i < handCount; i++){
            let thisCard = document.getElementById("card" + i); 

            thisCard.addEventListener("click", ()=>{
                buttonAction = "PLAY";
                uid = thisCard.getAttribute("uid");
                gameAction();
            })   
           
        }

        // choisir une carte pour attaquer
        let boardCount = parentMyBoard.childElementCount;
        for(let i = 0; i < boardCount; i++){
            let thisCard = document.getElementById("boardCard" + i);
            if(thisCard.state != "SLEEP"){
                thisCard.addEventListener("click", ()=>{
                    uid = thisCard.getAttribute("uid");
                    isCardAttacking = true;
                })  
            }
            
        }

        // choisir la carte/hero a attaquer
        let opponentBoardCount = parentOpponentBoard.childElementCount;
        for(let i = 0; i < opponentBoardCount; i++){
            let thisEnemyCard = document.getElementById("opponentBoardCard" + i);

            if(isCardAttacking){
                
                thisEnemyCard.addEventListener("click", ()=>{
                    buttonAction = "ATTACK";
                    ennemiUID = thisEnemyCard.getAttribute("ennemiUID");
                    areButtonsClicked = true;
                })  

                
                document.querySelector(".enemy-image").addEventListener("click", () =>{
                    document.querySelector(".enemy-image").style.border = `solid thick red`;
                    areButtonsClicked = true;
                    buttonAction = "ATTACK";
                    ennemiUID = 0;
                })
              
                
               
                if(areButtonsClicked == true){  // seulement appeler gameAction() si il y a un click
                    gameAction();
                    document.querySelector(".enemy-image").style.border = `solid thick orange`;
                    areButtonsClicked = false
                }
                
            }
             
        }

       
        
    }
        
}   
else{  // si la partie n'est pas en cours
    let gameOverText = document.createElement("h1");
    
    // si en attente d'un joueur
    if(data == "WAITING"){
        if(isWaitingSet == false){
            gameOverText.className = "waiting-text";
            gameOverText.style.color = "orange";

            gameOverText.innerText = "WAITING FOR OPPONENT..."
                
            document.querySelector(".game-body").appendChild(gameOverText);  
            isWaitingSet = true;
        }
        
    }
    else{  // si la partie est terminee
        let quitButton = document.createElement("div");
        quitButton.className = "quit";

        let quitText = document.createElement("h2");
        quitText.innerText = "QUIT";
        gameOverText.className = "game-over-text";
        document.querySelector(".board").remove();
        document.querySelector(".enemy-board").remove();
        
    
            if(data == "LAST_GAME_WON"){
                gameOverText.style.color = "green";
                gameOverText.innerText = "YOU WON"
                isGameOverShown = true;    
            }
            else if(data == "LAST_GAME_LOST"){
                gameOverText.style.color = "red";
                gameOverText.innerText = "YOU LOST";          
                isGameOverShown = true;  
            }
            
        
        

        document.querySelector(".game-body").appendChild(gameOverText);
        document.querySelector(".game-body").appendChild(quitButton);
        document.querySelector(".quit").appendChild(quitText);

        document.querySelector(".quit").addEventListener("mousedown", () =>{
    
            document.querySelector(".quit").style.opacity = 0.5;
            window.location.replace("lobby.php");
        })
    
    }
    
}
if(isGameOverShown == false){ // pour ne pas recevoir un game-over du ajax plus qu'une fois
     buttonAction = "";
    setTimeout(state, 1000); // Attendre 1 seconde avant de relancer l’appel
}
    })
}

const gameAction = ()=>{  
    let formData = new FormData();
    formData.append("type", buttonAction);
    formData.append("uid", uid);
    formData.append("euid", ennemiUID); 
    formData.append("enemyName", enemyName);
    
    fetch("action/GameAjaxState.php", {   
        method : "POST",       
        credentials: "include",
        body : formData
    })
.then(response => response.json())
.then(data => {

    // erreurs
   if(data == "INVALID_KEY"){
        errorMessage = "Error, the key is invalid";
    }
    else if(data == "INVALID_ACTION"){
        errorMessage = "Error, invalid action";
    }
    else if(data == "NOT_ENOUGH_ENERGY"){
        errorMessage = "YOU DONT HAVE ENOUGH ENERGY!";
    }
    else if(data == "BOARD_IS_FULL"){
        errorMessage = "The board is full!";
    }
    else if(data == "CARD_NOT_IN_HAND"){
        errorMessage = "Error, this card is not in your hand";
    }
    else if(data == "CARD_IS_SLEEPING"){
        errorMessage = "This card is sleeping, it cannot attack!";
    }
    else if(data == "MUST_ATTACK_TAUNT_FIRST"){
        errorMessage = "You must attack the taunt card first!";
    }
    else if(data == "CARD_NOT_FOUND"){
        errorMessage = "Error, card not found";
    }
    else if(data == "HERO_POWER_ALREADY_USED"){
        errorMessage ="You have already used your hero power this turn!";
    }
    else{
        errorMessage = "";
    }

    // message d'erreur
    let error = document.createElement("h1");
    error.className = "error-message";
    error.innerText = errorMessage;
    document.querySelector(".game-body").appendChild(error);

    // enlever le message d'erreur apres 2 secondes
    setTimeout(() => {
                
        document.querySelector(".game-body").removeChild(error);
        
    }, 2000);

})

}


const applyStyles = iframe => {
	let styles = {
		fontColor : "orange",
		backgroundColor : "#000000",
		fontSize : "20px"
	}
	
	iframe.contentWindow.postMessage(JSON.stringify(styles), "*");	
}
