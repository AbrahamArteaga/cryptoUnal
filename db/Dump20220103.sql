-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: cryptounal
-- ------------------------------------------------------
-- Server version	8.0.27
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `transactions`
--
CREATE SCHEMA IF NOT EXISTS `CryptoUNAL`;
USE `CryptoUNAL`;

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `idtransaction` varchar(256) NOT NULL,
  `wallet_sender` varchar(256) DEFAULT NULL,
  `wallet_receiver` varchar(256) DEFAULT NULL,
  `amount` decimal(10,5) DEFAULT NULL,
  `gas_fee` decimal(10,5) DEFAULT NULL,
  `wallets_idwallet` int NOT NULL,
  PRIMARY KEY (`idtransaction`),
  KEY `fk_transactions_wallets_idx` (`wallets_idwallet`),
  CONSTRAINT `fk_transactions_wallets` FOREIGN KEY (`wallets_idwallet`) REFERENCES `wallets` (`idwallet`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (1,'1','2',10.00100,0.00039,1),(2,'1','2',34.00000,0.10000,5),(3,'3','2',493.45540,0.04900,2),(4,'2','3',493.45540,0.04900,2),(5,'5','6',5839.34000,20.00000,6);
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `iduser` int NOT NULL AUTO_INCREMENT,
  `username` varchar(64) DEFAULT 'user',
  `email` varchar(256) NOT NULL,
  `hash_password` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`iduser`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users`(iduser,email,hash_password) VALUES (1,'user1@email.com','pass1'),(2,'user2@email.com','pass2'),(3,'user3@email.com','pass3'),(4,'user4@email.com','pass4'),(5,'user5@email.com','pass5');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wallets`
--

DROP TABLE IF EXISTS `wallets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wallets` (
  `idwallet` int not null AUTO_INCREMENT,
  `wallet_address` JSON NOT NULL,
  `type` varchar(3) DEFAULT NULL,
  `users_iduser` int NOT NULL,
  PRIMARY KEY (`idwallet`,`users_iduser`),
  KEY `fk_wallets_users1_idx` (`users_iduser`),
  CONSTRAINT `fk_wallets_users1` FOREIGN KEY (`users_iduser`) REFERENCES `users` (`iduser`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wallets`
--

LOCK TABLES `wallets` WRITE;
/*!40000 ALTER TABLE `wallets` DISABLE KEYS */;
/* INSERT INTO `wallets` VALUES (1,'btc',1),(2,'eth',1),(3,'eth',2),(4,'sol',4),(5,'sol',3),(6,'sol',1); */
/*!40000 ALTER TABLE `wallets` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-03 15:31:56

DROP PROCEDURE IF EXISTS retrieve_user_data;
DROP PROCEDURE IF EXISTS verify_email_register;
DROP PROCEDURE IF EXISTS register_user;
DROP PROCEDURE IF EXISTS createWallet;

delimiter //

CREATE PROCEDURE retrieve_user_data (IN email_form varchar(256), IN hashed_password varchar(256))
begin
SELECT * FROM users WHERE (email = email_form AND hash_password = hashed_password);
end;
//

CREATE PROCEDURE verify_email_register (IN email_form varchar(256))
begin
SELECT * FROM users WHERE email = email_form;
END;
//

CREATE PROCEDURE register_user (IN user varchar(256), IN email_form varchar(256), IN hashed_password varchar(256)) 
begin 
INSERT INTO users(username, email, hash_password) VALUES (user,email_form,hashed_password);
SELECT users.iduser FROM users WHERE users.email = email_form;
end;
//

CREATE PROCEDURE get_encryptedwallet (IN id int)
begin
	SELECT * FROM wallets WHERE users_iduser = id;
end;
//

CREATE PROCEDURE add_Transaction (IN id var )

delimiter ;
