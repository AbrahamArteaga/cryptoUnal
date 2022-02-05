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
  `iduser` int NOT NULL,
  `transactions_content` JSON DEFAULT NULL,  
  PRIMARY KEY (`iduser`),
  FOREIGN KEY (`iduser`) REFERENCES users(`iduser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
/*INSERT INTO `transactions` VALUES (1,'1','2',10.00100,0.00039,1),(2,'1','2',34.00000,0.10000,5),(3,'3','2',493.45540,0.04900,2),(4,'2','3',493.45540,0.04900,2),(5,'5','6',5839.34000,20.00000,6); */
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
INSERT INTO `users`(iduser,email,hash_password) VALUES (1,'user1@email.com','$2b$10$w6haV5VeL.rDgR9aJ0nqRO1S1vw6YiEt7FhJu8qZXKszKaptbmg2a'),(2,'user2@email.com','$2b$10$0PG6wzxsbDUUw8auoZczCumyuqno0gLwsFc5FhhrqOkIBM0KhMLoG'),(3,'user3@email.com','$2b$10$.0CGoVjWFkUE1meJMAYGnutbb14nSVOOOIkn0BJODL6o9dwJVuYL6'),(4,'user4@email.com','$2b$10$ZgvgA3U0JD2dKslfNcAvXeAnrvW9SYrm00Em9A1rDG7YnhXVr22Z.'),(5,'user5@email.com','$2b$10$nK.Ch4O6nc/T/eUkgwQS1ubndDRlJwKirOcU0jmhV.ZLnn3BrVsLy');
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
INSERT INTO `wallets` VALUES (1,'{\"id\": \"9541845a-d32b-4b3f-b289-d180e1aaa8eb\", \"crypto\": {\"kdf\": \"scrypt\", \"mac\": \"ca7af3e12cb42d824e127bfd15ab95d5e0fad415cd75c7f6715d27804ac85127\", \"cipher\": \"aes-128-ctr\", \"kdfparams\": {\"n\": 8192, \"p\": 1, \"r\": 8, \"salt\": \"19616e08e1f3cf2ab52534817f289575acc99aa33df46c4e9542c2e7a194d1c5\", \"dklen\": 32}, \"ciphertext\": \"7579fee797e80dee67f1723fc22266c428c8cdb0c2ea92d59495f77f3199d442\", \"cipherparams\": {\"iv\": \"5fc9ac2c04857dcce1ec1d785472ae51\"}}, \"address\": \"6fcb75934649e3bf6c18c3a5e02b0ec632813823\", \"version\": 3}','eth',1),(2,'{\"id\": \"04265268-e821-4bfd-b80b-bdfb3fe7dd0d\", \"crypto\": {\"kdf\": \"scrypt\", \"mac\": \"fb5e4f713f4ad074e388e0d12155207303e92f3ed7e9cf9b735696b2b79af64a\", \"cipher\": \"aes-128-ctr\", \"kdfparams\": {\"n\": 8192, \"p\": 1, \"r\": 8, \"salt\": \"700af8a5acbe6c39d6f913fc55c7e61e3e9831022d665a12040441ee30d6b9f0\", \"dklen\": 32}, \"ciphertext\": \"9fb9a019ed34697db9437e49118279ed4ce1ed2f3982e3f2a116762a69d1699f\", \"cipherparams\": {\"iv\": \"b77980b71a019e717562741505a21969\"}}, \"address\": \"2f19205efecf8584b8f9545d84971ba4c83017d8\", \"version\": 3}','eth',2);
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
DROP PROCEDURE IF EXISTS get_encryptedwallet;
DROP PROCEDURE IF EXISTS get_user_transaction;
DROP PROCEDURE IF EXISTS update_user_transactions;

delimiter //

CREATE PROCEDURE retrieve_user_data (IN email_form varchar(256))
BEGIN
SELECT * FROM users WHERE (email = email_form);
END;
//

CREATE PROCEDURE register_user (IN user varchar(256), IN email_form varchar(256), IN hashed_password varchar(256)) 
BEGIN 
INSERT INTO users(username, email, hash_password) VALUES (user,email_form,hashed_password);
SELECT users.iduser FROM users WHERE users.email = email_form;
END;
//

CREATE PROCEDURE get_encryptedwallet (IN id INT)
BEGIN
	SELECT * FROM wallets WHERE users_iduser = id;
END;
//

CREATE PROCEDURE get_user_transaction(IN id INT)
BEGIN
  SELECT transactions_content FROM transactions WHERE iduser = id;
END;
//

CREATE PROCEDURE update_user_transactions(IN id INT, IN trans JSON)
BEGIN
  DECLARE v_transaction_exist INT;  
  SELECT iduser INTO v_transaction_exist FROM transactions WHERE iduser = id;

  IF v_transaction_exist IS NULL THEN
    INSERT INTO transactions VALUES( id, trans);
  ELSE
    UPDATE transactions SET transactions_content = trans WHERE iduser = id;
  END IF;

END;
//
/* CREATE PROCEDURE add_Transaction (IN id var ) */

delimiter ;