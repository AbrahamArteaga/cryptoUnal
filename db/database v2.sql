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
INSERT INTO `users`(iduser,email,hash_password) VALUES (1,'user1@email.com','1'),(2,'user2@email.com','1'),(3,'user3@email.com','1'),(4,'user4@email.com','1'),(5,'user5@email.com','1');
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
INSERT INTO `wallets` VALUES (1,'{\"id\": \"9541845a-d32b-4b3f-b289-d180e1aaa8eb\", \"crypto\": {\"kdf\": \"scrypt\", \"mac\": \"ca7af3e12cb42d824e127bfd15ab95d5e0fad415cd75c7f6715d27804ac85127\", \"cipher\": \"aes-128-ctr\", \"kdfparams\": {\"n\": 8192, \"p\": 1, \"r\": 8, \"salt\": \"19616e08e1f3cf2ab52534817f289575acc99aa33df46c4e9542c2e7a194d1c5\", \"dklen\": 32}, \"ciphertext\": \"7579fee797e80dee67f1723fc22266c428c8cdb0c2ea92d59495f77f3199d442\", \"cipherparams\": {\"iv\": \"5fc9ac2c04857dcce1ec1d785472ae51\"}}, \"address\": \"6fcb75934649e3bf6c18c3a5e02b0ec632813823\", \"version\": 3}','eth',1),(2,'{\"id\": \"04265268-e821-4bfd-b80b-bdfb3fe7dd0d\", \"crypto\": {\"kdf\": \"scrypt\", \"mac\": \"fb5e4f713f4ad074e388e0d12155207303e92f3ed7e9cf9b735696b2b79af64a\", \"cipher\": \"aes-128-ctr\", \"kdfparams\": {\"n\": 8192, \"p\": 1, \"r\": 8, \"salt\": \"700af8a5acbe6c39d6f913fc55c7e61e3e9831022d665a12040441ee30d6b9f0\", \"dklen\": 32}, \"ciphertext\": \"9fb9a019ed34697db9437e49118279ed4ce1ed2f3982e3f2a116762a69d1699f\", \"cipherparams\": {\"iv\": \"b77980b71a019e717562741505a21969\"}}, \"address\": \"2f19205efecf8584b8f9545d84971ba4c83017d8\", \"version\": 3}','eth',2),(3,'{\"id\": \"a958c8c4-250b-4d7d-a63c-2e47426db595\", \"crypto\": {\"kdf\": \"scrypt\", \"mac\": \"a18c1452bb0b9ec2dcb2270becf30ec059596993bd4162a20dfd82b7c29427e0\", \"cipher\": \"aes-128-ctr\", \"kdfparams\": {\"n\": 8192, \"p\": 1, \"r\": 8, \"salt\": \"25b0862affc7b1efbfaf9eb746df4afcace1c3c49ec9a50d34b6967103ef6ac9\", \"dklen\": 32}, \"ciphertext\": \"e05a14524109f9ffcdf119832aa9d9647c12fe2c9bdeebdda9d904c14105ed20\", \"cipherparams\": {\"iv\": \"9f8d45e91721e41a2f03261aa26050c9\"}}, \"address\": \"2f19205efecf8584b8f9545d84971ba4c83017d8\", \"version\": 3}','eth',3),(4,'{\"id\": \"cc654bbd-4edf-4f28-ac8a-9214e5b3b4d7\", \"crypto\": {\"kdf\": \"scrypt\", \"mac\": \"4418911462b3a6506eaed729ef4ce3711b2e969cc43815232fb4b668b55c5679\", \"cipher\": \"aes-128-ctr\", \"kdfparams\": {\"n\": 8192, \"p\": 1, \"r\": 8, \"salt\": \"556a96ef9149eaf43437071de3f87c83d0d9d1846db1a8795d453f34f117ff6e\", \"dklen\": 32}, \"ciphertext\": \"ca93973b36b47d797b1f7d0cfbe4d8c899cbbb13e6e1f76d5b58ca465e73f5cd\", \"cipherparams\": {\"iv\": \"aa95f84916640560a042c48fcb93bb6e\"}}, \"address\": \"2f19205efecf8584b8f9545d84971ba4c83017d8\", \"version\": 3}','eth',4),(5,'{\"id\": \"db75aaff-6b6c-423b-9203-1061b59d007f\", \"crypto\": {\"kdf\": \"scrypt\", \"mac\": \"73c143e209b585f625be35bf73216be25d9f304f84eea7abeb5c52b6c9efb6b6\", \"cipher\": \"aes-128-ctr\", \"kdfparams\": {\"n\": 8192, \"p\": 1, \"r\": 8, \"salt\": \"8593e5c2d94faf2176c331df9dd594313f0c840f11cdd667b772bd9ff2bb39ce\", \"dklen\": 32}, \"ciphertext\": \"c0c68d9d8a2e430885c798bd4d2dd8df0c7e6dc97267ee4d240842198a48cc6a\", \"cipherparams\": {\"iv\": \"d59f0cf9abb8c6141d3ffb70c52774d5\"}}, \"address\": \"2f19205efecf8584b8f9545d84971ba4c83017d8\", \"version\": 3}','eth',5);
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
