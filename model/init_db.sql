--
-- Drop Tables
--

SET foreign_key_checks = 0;
DROP TABLE if exists events;
DROP TABLE if exists votes;
DROP TABLE if exists users;
SET foreign_key_checks = 1;

--
-- Create Tables
--
CREATE TABLE `users`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `firstname` VARCHAR(255) NOT NULL,
    `lastname` VARCHAR(255) NOT NULL
);

CREATE TABLE `events`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT UNSIGNED NOT NULL,
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
    `votes` ADD CONSTRAINT `votes_event_id_foreign` FOREIGN KEY(`event_id`) REFERENCES `events`(`id`) ON DELETE CASCADE;

ALTER TABLE    
    `events` ADD CONSTRAINT `events_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE;