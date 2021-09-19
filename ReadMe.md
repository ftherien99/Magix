# Projet Magix du cours 420-C55-IN
# François Thérien
# Travail remis le 27 novembre 2020


># Étapes à suivre pour le déroulement du jeu


## LOGIN
- Dans la page d'accueil, cliquer n'importe où sur la fenêtre fera apparaître un fantôme. Ce fantôme suivra la souris jusqu'a temps qu'il arrive à la même position, où il se détruira. Plusieurs fantômes peuvent apparaître

- Le nom du joueur sera enregistré dans une variable de session

- Un message d'erreur apparaît si l'identifiant est mauvais


## LOBBY
- Dans le lobby, vous pouvez accéder à 4 options; Jouer une partie PVP, se pratiquer avec un A.I, afficher l'historique
des 10 dernières parties et quitter le jeu. Afin d'accéder à ces fonctionnalités, vous devez cliquer sur la porte correspondante à l'option de votre choix. Lorsque la souris passe au dessus d'une de ces portes, un effet est rajouté

- La fenêtre chat est implémentée

- Le nom du joueur est affiché


## GAME
- Tant que les deux joueurs ne sont pas rentrés, un message WAITING s'affichera

- Au début de la partie, les messages d'introduction apparaîssent et disparraîsent après 2 secondes

- Les cartes jouables auront une bordure verte, tandis que les cartes qu'on ne peut pas jouer n'en auront pas

- Les cartes de type TAUNT auront une bordure rouge

- Les boutons END TURN et HERO POWER changerons d'opacité quand on clique dessus. Utiliser le bouton HERO POWER réduira son opacité jusqu'au prochain tour

- Quand on attaque le hero adverse, sa bordure devient rouge 

- La fenêtre de chat est implémentée. Cliquer sur le bouton CHAT la fera disparaître, on l'a fait réapparaître en cliquant encore sur le bouton

- Dépandamment si on gagne ou si on perd la partie, un message s'affichera avec un bouton QUIT qui retournera l'utilisateur au lobby

- On envoit le nom de l'ennemi à la base de donnée, ainsi que le nom du joueur et du gagnant

- Si, pendant le déroulement de la partie, une erreur survient (comme par exemple un nombre insuffisant de mp),
un message d'erreur s'affichera dépendamment du type d'erreur


## HISTORY/BASE DE DONNÉES
- Dans le coins de la page, un bouton rammenera le joueur au lobby

- Les 10 dernières parties jouées par le joueur seront affichées en ordre

- Code de la table:
```
CREATE TABLE magix
(
    id 			SERIAL,
    playername 	VARCHAR(64)  NOT NULL,
    enemyname 	VARCHAR(64)  NOT NULL,
    winner		VARCHAR(64)  NOT NULL,
    date 		date
)
```
