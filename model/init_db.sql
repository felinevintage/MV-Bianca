--
-- Drop Tables
--

SET foreign_key_checks = 0;
DROP TABLE if exists events;
DROP TABLE if exists votes;
SET foreign_key_checks = 1;

--
-- Create Tables
--
CREATE TABLE `events`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `event_title` VARCHAR(255) NOT NULL,
    `event_date` VARCHAR(255) NOT NULL,
    `event_time` VARCHAR(255) NOT NULL,
    `created_by` VARCHAR(255) NOT NULL
);
CREATE TABLE `votes`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `event_id` BIGINT UNSIGNED NOT NULL,
    `chosen_by` VARCHAR(255) NOT NULL,
    `activity_type` VARCHAR(255) NOT NULL,
    `notes` VARCHAR(255) NOT NULL
);
ALTER TABLE
    `votes` ADD CONSTRAINT `votes_event_id_foreign` FOREIGN KEY(`event_id`) REFERENCES `events`(`id`) ON DELETE CASCADE