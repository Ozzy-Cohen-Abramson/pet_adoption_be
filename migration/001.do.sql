-- this is where we'll create our sql querys for
-- create table 

CREATE TABLE `pets` (
  `pet_id` int NOT NULL AUTO_INCREMENT,
  `pet_type` varchar(255) NOT NULL,
  `pet_name` varchar(45) NOT NULL,
  `adoption_status` varchar(45) NOT NULL,
  `pet_picture` varchar(255) DEFAULT NULL,
  `pet_height` decimal(5,2) NOT NULL,
  `pet_weight` decimal(5,2) DEFAULT NULL,
  `pet_color` varchar(45) DEFAULT NULL,
  `pet_hypoallergenic` varchar(10) DEFAULT NULL,
  `pet_dietary` varchar(255) DEFAULT NULL,
  `pet_breed` varchar(45) DEFAULT NULL,
  `pet_bio` text,
  PRIMARY KEY (`pet_id`)

  CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_fn` varchar(45) NOT NULL,
  `user_family_name` varchar(45) NOT NULL,
  `user_email` varchar(45) NOT NULL,
  `user_phone` varchar(12) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_bio` text,
  `user_fav_pets` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`)
)