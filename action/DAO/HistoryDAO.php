<?php
    require_once("Connection.php");


    class HistoryDAO {

        public static function getHistoryInfo() {
            $connection = Connection::getConnection();

            $statement = $connection->prepare("SELECT * FROM magix");
            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();

            return $statement->fetchAll();
        }

        public static function sendStats($playerName, $enemyName, $winner){
            $connection = Connection::getConnection();

            $statement = $connection->prepare("INSERT INTO  magix  VALUES (DEFAULT, ?, ?,?, CURRENT_DATE);");
            $statement->bindParam(1, $playerName);
            $statement->bindParam(2, $enemyName);
            $statement->bindParam(3, $winner);

            $statement->execute();
            
        }

    }