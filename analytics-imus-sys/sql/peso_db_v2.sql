-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: peso_db
-- ------------------------------------------------------
-- Server version	8.2.0

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
-- Table structure for table `applications`
--

DROP TABLE IF EXISTS `applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `applications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications`
--

LOCK TABLES `applications` WRITE;
/*!40000 ALTER TABLE `applications` DISABLE KEYS */;
INSERT INTO `applications` VALUES (1,2,'accepted',NULL,'2024-06-18 02:21:51'),(2,3,'accepted',NULL,'2024-06-17 23:44:54');
/*!40000 ALTER TABLE `applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `educational_background`
--

DROP TABLE IF EXISTS `educational_background`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `educational_background` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `elementary_school` varchar(255) DEFAULT NULL,
  `elementary_course` varchar(255) DEFAULT NULL,
  `elementary_year_graduated` varchar(45) DEFAULT NULL,
  `if_elementary_undergraduate` varchar(255) DEFAULT NULL,
  `secondary_school` varchar(255) DEFAULT NULL,
  `secondary_course` varchar(255) DEFAULT NULL,
  `secondary_year_graduated` varchar(45) DEFAULT NULL,
  `if_secondary_undergraduate` varchar(255) DEFAULT NULL,
  `tertiary_school` varchar(255) DEFAULT NULL,
  `tertiary_course` varchar(255) DEFAULT NULL,
  `tertiary_year_graduated` varchar(45) DEFAULT NULL,
  `if_tertiary_undergraduate` varchar(255) DEFAULT NULL,
  `graduate_studies_school` varchar(255) DEFAULT NULL,
  `graduate_studies_course` varchar(255) DEFAULT NULL,
  `graduate_studies_year_attended` varchar(45) DEFAULT NULL,
  `if_graduate_studies_undergraduate` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `educational_background`
--

LOCK TABLES `educational_background` WRITE;
/*!40000 ALTER TABLE `educational_background` DISABLE KEYS */;
INSERT INTO `educational_background` VALUES (1,2,'Aniban Central School','na','2012','{}','Bacoor National Highscool','na','2018','{}','Cavite State University','BSCS','2024','{}','na','na','na','{}','2024-06-16 00:33:03','2024-06-17 19:52:34'),(2,3,'San Jose Pilot Elementary School','na','2012','{\"awards_received\":\"Valedictorian\"}','Magsaysay National Highschool','na','na','{\"what_level\":\"2nd year\",\"last_year_attended\":\"2015\"}','na','na','na','{}','na','na','na','{}','2024-06-16 13:05:49','2024-06-17 18:04:28'),(3,4,'Zapote Elementary School','na','na','{\"what_level\":\"Grade 5\",\"last_year_attended\":\"2006\"}','na','na','na','{}','na','na','na','{}','na','na','na','{}','2024-06-16 15:20:06',NULL),(4,5,'na','na','na','{}','na','na','na','{}','na','na','na','{}','na','na','na','{}','2024-06-16 18:34:48',NULL);
/*!40000 ALTER TABLE `educational_background` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eligibility_professional_license`
--

DROP TABLE IF EXISTS `eligibility_professional_license`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eligibility_professional_license` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `eligibility` varchar(255) DEFAULT NULL,
  `rating` varchar(255) DEFAULT NULL,
  `date_exam` varchar(255) DEFAULT NULL,
  `professional_license` varchar(255) DEFAULT NULL,
  `valid_until` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eligibility_professional_license`
--

LOCK TABLES `eligibility_professional_license` WRITE;
/*!40000 ALTER TABLE `eligibility_professional_license` DISABLE KEYS */;
INSERT INTO `eligibility_professional_license` VALUES (1,2,'{\"eligibility1\":\"Civil Service 1\",\"eligibility2\":\"\"}','{\"rating1\":\"99\",\"rating2\":\"\"}','{\"date_exam1\":\"2024-06-01\",\"date_exam2\":\"\"}','{\"profLicense1\":\"\",\"profLicense2\":\"\"}','{\"validUntil1\":\"\",\"validUntil2\":\"\"}','2024-06-16 00:33:03','2024-06-17 19:52:34'),(2,3,'{\"eligibility1\":\"Civil Service 1\",\"eligibility2\":\"Civil Service 2\"}','{\"rating1\":\"100\",\"rating2\":\"100\"}','{\"date_exam1\":\"2024-05-26\",\"date_exam2\":\"2024-05-26\"}','{\"profLicense1\":\"PRC 1\",\"profLicense2\":\"PRC 2\"}','{\"validUntil1\":\"2024-05-26\",\"validUntil2\":\"2024-06-18\"}','2024-06-16 13:05:49','2024-06-17 18:04:28'),(3,4,'{\"eligibility1\":\"na\",\"eligibility2\":\"\"}','{\"rating1\":\"\",\"rating2\":\"\"}','{\"date_exam1\":\"\",\"date_exam2\":\"\"}','{\"profLicense1\":\"\",\"profLicense2\":\"\"}','{\"validUntil1\":\"\",\"validUntil2\":\"\"}','2024-06-16 15:20:06',NULL),(4,5,'{\"eligibility1\":\"na\",\"eligibility2\":\"\"}','{\"rating1\":\"\",\"rating2\":\"\"}','{\"date_exam1\":\"\",\"date_exam2\":\"\"}','{\"profLicense1\":\"\",\"profLicense2\":\"\"}','{\"validUntil1\":\"\",\"validUntil2\":\"\"}','2024-06-16 18:34:48',NULL);
/*!40000 ALTER TABLE `eligibility_professional_license` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_preference`
--

DROP TABLE IF EXISTS `job_preference`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_preference` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `preferred_occupation` varchar(255) DEFAULT NULL,
  `occupation` varchar(255) DEFAULT NULL,
  `preferred_work_occupation` varchar(255) DEFAULT NULL,
  `work_occupation` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_preference`
--

LOCK TABLES `job_preference` WRITE;
/*!40000 ALTER TABLE `job_preference` DISABLE KEYS */;
INSERT INTO `job_preference` VALUES (1,2,'{\"type_preferred_occupation\":\"full time\"}','{\"occupation1\":\"Full-Stack Developer\",\"occupation2\":\"\",\"occupation3\":\"\"}','{\"type_work_occupation\":\"local\"}','{\"location1\":\"Makati\",\"location2\":\"\",\"location3\":\"\"}','2024-06-16 00:33:03','2024-06-17 19:52:34'),(2,3,'{\"type_preferred_occupation\":\"part time\"}','{\"occupation1\":\"Back-end developer\",\"occupation2\":\"Front-end developer\",\"occupation3\":\"\"}','{\"type_work_occupation\":\"overseas\"}','{\"location1\":\"Canada\",\"location2\":\"Japan\",\"location3\":\"\"}','2024-06-16 13:05:49','2024-06-17 18:04:28'),(3,4,'{\"type_preferred_occupation\":\"full time\"}','{\"occupation1\":\"Developer\",\"occupation2\":\"\",\"occupation3\":\"\"}','{\"type_work_occupation\":\"local\"}','{\"location1\":\"Makati\",\"location2\":\"\",\"location3\":\"\"}','2024-06-16 15:20:06',NULL),(4,5,'{\"type_preferred_occupation\":\"part time\"}','{\"occupation1\":\"Developer\",\"occupation2\":\"\",\"occupation3\":\"\"}','{\"type_work_occupation\":\"local\"}','{\"location1\":\"Makati\",\"location2\":\"\",\"location3\":\"\"}','2024-06-16 18:34:48',NULL);
/*!40000 ALTER TABLE `job_preference` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `language_dialect_proficiency`
--

DROP TABLE IF EXISTS `language_dialect_proficiency`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `language_dialect_proficiency` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `language1` varchar(255) DEFAULT NULL,
  `language2` varchar(255) DEFAULT NULL,
  `language3` varchar(255) DEFAULT NULL,
  `other_language` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `language_dialect_proficiency`
--

LOCK TABLES `language_dialect_proficiency` WRITE;
/*!40000 ALTER TABLE `language_dialect_proficiency` DISABLE KEYS */;
INSERT INTO `language_dialect_proficiency` VALUES (1,2,'{\"english\":{\"read\":1,\"write\":1,\"speak\":1,\"understand\":1}}','{\"filipino\":{\"read\":1,\"write\":1,\"speak\":1,\"understand\":1}}','{}','{}','2024-06-16 00:33:03','2024-06-17 19:52:34'),(2,3,'{\"english\":{\"read\":1,\"write\":1,\"speak\":1,\"understand\":1}}','{\"filipino\":{\"write\":1}}','{\"mandarin\":{\"speak\":1}}','{}','2024-06-16 13:05:49','2024-06-17 18:04:28'),(3,4,'{\"english\":{\"read\":1}}','{\"filipino\":{\"write\":1}}','{\"mandarin\":{\"speak\":1,\"understand\":1}}','{}','2024-06-16 15:20:06',NULL),(4,5,'{\"english\":{\"read\":1}}','{\"filipino\":{\"write\":1}}','{\"mandarin\":{\"speak\":1}}','{}','2024-06-16 18:34:48',NULL);
/*!40000 ALTER TABLE `language_dialect_proficiency` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `description` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (1,2,'Mohamad Ali successfully submitted application.','2024-06-16 00:33:03',NULL),(2,2,'Mohamad Ali application is on-process','2024-06-16 00:33:03',NULL),(3,3,'Something','2024-06-16 00:33:03',NULL),(4,2,'JuanDL updated application successfully','2024-06-17 19:52:34',NULL),(5,2,'JuanDL updated application successfully','2024-06-17 19:52:34',NULL),(6,2,'JuanDL updated application successfully','2024-06-17 19:52:34',NULL),(7,2,'JuanDL updated application successfully','2024-06-17 19:52:34',NULL),(8,1,'JuanDL\'s application status is on-process','2024-06-17 23:46:56',NULL),(9,NULL,'JuanDL\'s application status is on-process','2024-06-17 23:48:33',NULL),(10,2,'JuanDL\'s application status is rejected','2024-06-17 23:48:51',NULL),(11,4,'PedroMon\'s application status is rejected','2024-06-18 00:58:53',NULL),(12,2,'JuanDL\'s application status is on-process','2024-06-18 01:11:31',NULL),(13,2,'JuanDL\'s application status is accepted','2024-06-18 02:21:51',NULL);
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `other_skills`
--

DROP TABLE IF EXISTS `other_skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `other_skills` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `skills` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `other_skills`
--

LOCK TABLES `other_skills` WRITE;
/*!40000 ALTER TABLE `other_skills` DISABLE KEYS */;
INSERT INTO `other_skills` VALUES (1,2,'{\"skill1\":\"computer literate\"}','2024-06-16 00:33:03','2024-06-17 19:52:34'),(2,3,'{\"skill1\":\"automechanic\",\"skill2\":\"carpentry\",\"skill3\":\"domestic chores\",\"skill4\":\"embroidery\",\"skill5\":\"masonry\",\"skill6\":\"painting\",\"skill7\":\"photography\",\"skill8\":\"sewing\",\"skill9\":\"tailoring\"}','2024-06-16 13:05:49','2024-06-17 18:04:28'),(3,4,'{\"skill1\":\"computer literate\"}','2024-06-16 15:20:06',NULL),(4,5,'{\"skill1\":\"computer literate\",\"skill2\":\"photography\",\"skill3\":\"stenography\",\"other\":\"skill\"}','2024-06-16 18:34:48',NULL);
/*!40000 ALTER TABLE `other_skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_information`
--

DROP TABLE IF EXISTS `personal_information`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_information` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `surname` varchar(45) DEFAULT NULL,
  `firstname` varchar(45) DEFAULT NULL,
  `middlename` varchar(45) DEFAULT NULL,
  `suffix` varchar(45) DEFAULT NULL,
  `birthdate` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `contact` varchar(45) DEFAULT NULL,
  `height` varchar(45) DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `civil_status` varchar(45) DEFAULT NULL,
  `disability` varchar(255) DEFAULT NULL,
  `religion` varchar(45) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `employment_status` text,
  `is_ofw` varchar(255) DEFAULT NULL,
  `is_former_ofw` varchar(255) DEFAULT NULL,
  `is_4ps_beneficiary` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_information`
--

LOCK TABLES `personal_information` WRITE;
/*!40000 ALTER TABLE `personal_information` DISABLE KEYS */;
INSERT INTO `personal_information` VALUES (1,2,'Dela Cruz','Juan','Garcia','Jr.','2024-04-09','juandelacruz@gmail.com','09701638399','5\'6','male','single','{\"disability1\":\"visual\",\"other\":\"\"}','Christian','{\"house_no_street\":\"8th Street\",\"barangay\":\"Aniban 2\",\"city_municipality\":\"Bacoor\",\"province\":\"Cavite\"}','{\"employment_status\":\"employed\",\"employed_type\":\"wage employed\"}','{\"is_ofw\":\"no\"}','{\"is_former_ofw\":\"no\"}','{\"is_4ps_beneficiary\":\"no\"}','2024-06-16 00:33:03','2024-06-17 19:52:34'),(2,3,'Yum','Pares','Mami','Jr.','2024-05-28','pares@gmail.com','09701638399','5,7','male','single','{\"disability1\":\"na\",\"other\":\"\"}','Christian','{\"house_no_street\":\"Malinis Street\",\"barangay\":\"Mambog 1\",\"city_municipality\":\"Bacoor\",\"province\":\"Cavite\"}','{\"employment_status\":\"employed\",\"employed_type\":\"self employed\",\"job\":{\"job1\":\"fisherman/fisherfolk\",\"job2\":\"vendor/retailer\",\"job3\":\"home based worker\",\"job4\":\"transport\",\"job5\":\"domestic\",\"job6\":\"freelancer\",\"job7\":\"artisan/craft worker\",\"other\":\"Farmer\"}}','{\"is_ofw\":\"Japan\"}','{\"country\":\"South Korea\",\"month_year\":\"December 2023\"}','{\"is_4ps_beneficiary\":\"yes\",\"household_no\":\"12345\"}','2024-06-16 13:05:49','2024-06-17 18:04:28'),(3,4,'Garcia','Pedro Mon','Mondragon','Sr.','2024-06-01','pedro@gmail.com','09123456789','5\'6','male','single','{\"disability1\":\"visual\",\"disability2\":\"hearing\",\"disability3\":\"speech\",\"other\":\"Disability\"}','Christian','{\"house_no_street\":\"8th Street\",\"barangay\":\"Aniban 2\",\"city_municipality\":\"Bacoor\",\"province\":\"Cavite\"}','{\"employment_status\":\"unemployed\",\"how_long_looking_for_work\":\"12 months\",\"unemployed_type\":\"finished contract\",\"other\":\"anything\"}','{\"is_ofw\":\"no\"}','{\"is_former_ofw\":\"no\"}','{\"is_4ps_beneficiary\":\"no\"}','2024-06-16 15:20:06',NULL),(4,5,'Luna','Maria Clara','Garcia','na','2024-05-30','mariac@gmail.com','0945645492','5\'6','female','married','{\"disability1\":\"visual\",\"disability2\":\"speech\",\"other\":\"disability\"}','Christian','{\"house_no_street\":\"123\",\"barangay\":\"Palico I\",\"city_municipality\":\"Imus\",\"province\":\"Cavite\"}','{\"employment_status\":\"unemployed\",\"how_long_looking_for_work\":\"10 months\",\"unemployed_type\":\"terminated/laid off (abroad)\",\"country\":\"North Korea\"}','{\"is_ofw\":\"no\"}','{\"is_former_ofw\":\"no\"}','{\"is_4ps_beneficiary\":\"no\"}','2024-06-16 18:34:48',NULL);
/*!40000 ALTER TABLE `personal_information` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `technical_vocational_training`
--

DROP TABLE IF EXISTS `technical_vocational_training`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `technical_vocational_training` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `course` varchar(255) DEFAULT NULL,
  `institution` varchar(255) DEFAULT NULL,
  `date_from` varchar(255) DEFAULT NULL,
  `date_to` varchar(255) DEFAULT NULL,
  `certificate` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `technical_vocational_training`
--

LOCK TABLES `technical_vocational_training` WRITE;
/*!40000 ALTER TABLE `technical_vocational_training` DISABLE KEYS */;
INSERT INTO `technical_vocational_training` VALUES (1,2,'{\"course1\":\"Full-Stack Web Development\",\"course2\":\"\",\"course3\":\"\"}','{\"institution1\":\"Village88, Inc.\",\"institution2\":\"\",\"institution3\":\"\"}','{\"date_from1\":\"2024-05-31\",\"date_from2\":\"\",\"date_from3\":\"\"}','{\"date_to1\":\"2024-06-27\",\"date_to2\":\"\",\"date_to3\":\"\"}','{\"certificate1\":\"Best Capstone\",\"certificate2\":\"\",\"certificate3\":\"\"}','2024-06-16 00:33:03','2024-06-17 19:52:34'),(2,3,'{\"course1\":\"Course 1\",\"course2\":\"Course 2\",\"course3\":\"Course 3\"}','{\"institution1\":\"Institution 1\",\"institution2\":\"Institution 2\",\"institution3\":\"Institution 3\"}','{\"date_from1\":\"2024-05-31\",\"date_from2\":\"2024-05-27\",\"date_from3\":\"2024-05-26\"}','{\"date_to1\":\"2024-07-01\",\"date_to2\":\"2024-07-02\",\"date_to3\":\"2024-07-06\"}','{\"certificate1\":\"Certificate 1\",\"certificate2\":\"Certificate 2\",\"certificate3\":\"Certificate 3\"}','2024-06-16 13:05:49','2024-06-17 18:04:28'),(3,4,'{\"course1\":\"na\",\"course2\":\"\",\"course3\":\"\"}','{\"institution1\":\"\",\"institution2\":\"\",\"institution3\":\"\"}','{\"date_from1\":\"\",\"date_from2\":\"\",\"date_from3\":\"\"}','{\"date_to1\":\"\",\"date_to2\":\"\",\"date_to3\":\"\"}','{\"certificate1\":\"\",\"certificate2\":\"\",\"certificate3\":\"\"}','2024-06-16 15:20:06',NULL),(4,5,'{\"course1\":\"na\",\"course2\":\"\",\"course3\":\"\"}','{\"institution1\":\"\",\"institution2\":\"\",\"institution3\":\"\"}','{\"date_from1\":\"\",\"date_from2\":\"\",\"date_from3\":\"\"}','{\"date_to1\":\"\",\"date_to2\":\"\",\"date_to3\":\"\"}','{\"certificate1\":\"\",\"certificate2\":\"\",\"certificate3\":\"\"}','2024-06-16 18:34:48',NULL);
/*!40000 ALTER TABLE `technical_vocational_training` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `is_admin` tinyint DEFAULT NULL,
  `password` text,
  `phonenumber` varchar(255) DEFAULT NULL,
  `birthdate` varchar(45) DEFAULT NULL,
  `civil_status` varchar(45) DEFAULT NULL,
  `image_path` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Ali20',NULL,NULL,'alicalanda@gmail.com',1,'$2a$10$wXGZjaFe4D48cq6G7EFlo.oUZpwJ//GGFASXj8NeA5j6xTqBELb8K',NULL,NULL,NULL,NULL,'2024-06-15 21:36:08',NULL),(2,'JuanDL','Juan','Dela','juandelacruz@gmail.com',0,'$2a$10$gw1YaY0lWbmyjbqbXLMcnu6kQkirkDS/gPTKDGxkv93tnO/G22iWm','09706192826','2024-06-18','widowed','1718730957275-default_profile.jpg','2024-06-15 21:40:18',NULL),(3,'Pares2000',NULL,NULL,'pares@gmail.com',0,'$2a$10$N0ZOyvccpoCDwA5CaqNPrOmq6AU7bQLjs94Sjat/xvfq2DsBXvUVu',NULL,NULL,'null',NULL,'2024-06-16 12:53:33',NULL),(4,'PedroMon',NULL,NULL,'pedro@gmail.com',0,'$2a$10$8LwlLiKZQygzSxxBbLjNhOk2nW.nTeAgbI2NZRmGuCp.0kBMkO7ee',NULL,NULL,NULL,NULL,'2024-06-16 14:56:42',NULL),(5,'MariaC',NULL,NULL,'mariac@gmail.com',0,'$2a$10$kENII.3KRCvv0uWY7RW1..pQ9EJ0m7J3B82tnKCk11M4jYdr2aZZK',NULL,NULL,NULL,NULL,'2024-06-16 18:31:32',NULL),(6,'Saifu',NULL,NULL,'saifu@gmail.com',0,'$2a$10$LgOxlBqF9d2EbPzfzponZewPKMgySoJ2P2Oj1/r5QcUAH9QyRSqK6',NULL,NULL,NULL,NULL,'2024-06-17 16:04:17',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `work_experience`
--

DROP TABLE IF EXISTS `work_experience`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `work_experience` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `company_address` varchar(255) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `inclusive_date` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work_experience`
--

LOCK TABLES `work_experience` WRITE;
/*!40000 ALTER TABLE `work_experience` DISABLE KEYS */;
INSERT INTO `work_experience` VALUES (1,2,'{\"company_name1\":\"Ollopa Corporation\",\"company_name2\":\"\",\"company_name3\":\"\"}','{\"company_address1\":\"Quezon City\",\"company_address2\":\"\",\"company_address3\":\"\"}','{\"position1\":\"QA Manual Tester\",\"position2\":\"\",\"position3\":\"\"}','{\"inclusive_date1\":\"2024-05-29\",\"inclusive_date2\":\"\",\"inclusive_date3\":\"\"}','{\"status1\":null,\"status2\":null,\"status3\":null}','2024-06-16 00:33:03','2024-06-17 19:52:34'),(2,3,'{\"company_name1\":\"Company 1\",\"company_name2\":\"Company 2\",\"company_name3\":\"Company 3\"}','{\"company_address1\":\"Addess 1\",\"company_address2\":\"Address 2\",\"company_address3\":\"Address 3\"}','{\"position1\":\"Position 1\",\"position2\":\"Position 2\",\"position3\":\"Position 3\"}','{\"inclusive_date1\":\"2024-05-27\",\"inclusive_date2\":\"2024-06-03\",\"inclusive_date3\":\"2024-05-27\"}','{\"status1\":\"contractual\",\"status2\":\"part-time\",\"status3\":\"probationary\"}','2024-06-16 13:05:49','2024-06-17 18:04:28'),(3,4,'{\"company_name1\":\"na\",\"company_name2\":\"\",\"company_name3\":\"\"}','{\"company_address1\":\"\",\"company_address2\":\"\",\"company_address3\":\"\"}','{\"position1\":\"\",\"position2\":\"\",\"position3\":\"\"}','{\"inclusive_date1\":\"\",\"inclusive_date2\":\"\",\"inclusive_date3\":\"\"}','{\"status1\":null,\"status2\":null,\"status3\":null}','2024-06-16 15:20:06',NULL),(4,5,'{\"company_name1\":\"na\",\"company_name2\":\"\",\"company_name3\":\"\"}','{\"company_address1\":\"\",\"company_address2\":\"\",\"company_address3\":\"\"}','{\"position1\":\"\",\"position2\":\"\",\"position3\":\"\"}','{\"inclusive_date1\":\"\",\"inclusive_date2\":\"\",\"inclusive_date3\":\"\"}','{\"status1\":null,\"status2\":null,\"status3\":null}','2024-06-16 18:34:48',NULL);
/*!40000 ALTER TABLE `work_experience` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-19  1:34:03
