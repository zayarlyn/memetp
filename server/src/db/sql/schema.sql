CREATE DATABASE `memetp`;
USE `memetp`;

CREATE TABLE `s3_object` (`id` VARCHAR(255) NOT NULL , `filename` VARCHAR(255) NOT NULL, `mimetype` VARCHAR(255) NOT NULL, `size` INTEGER NOT NULL, `model_name` VARCHAR(255), `modelId` VARCHAR(255), `width` FLOAT, `height` FLOAT, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `deletedAt` DATETIME, PRIMARY KEY (`id`)) ENGINE=InnoDB;

CREATE TABLE `template` (`id` INTEGER auto_increment , `title` VARCHAR(255) NOT NULL, `likes` INTEGER DEFAULT 0, `downloads` INTEGER DEFAULT 0, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `deletedAt` DATETIME, PRIMARY KEY (`id`)) ENGINE=InnoDB;
