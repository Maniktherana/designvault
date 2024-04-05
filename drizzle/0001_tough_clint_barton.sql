CREATE TABLE `email_verification_codes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`code` text NOT NULL,
	`email` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);

DROP INDEX IF EXISTS `email_idx`;
DROP INDEX IF EXISTS `main_tag_idx`;
DROP INDEX IF EXISTS `id_idx`;
/*
 SQLite does not support "Set default to column" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html
                  https://stackoverflow.com/questions/2083543/modify-a-columns-type-in-sqlite3

 Due to that we don't generate migration automatically and it has to be done manually
*/
/*
 SQLite does not support "Drop not null from column" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html
                  https://stackoverflow.com/questions/2083543/modify-a-columns-type-in-sqlite3

 Due to that we don't generate migration automatically and it has to be done manually
*/
ALTER TABLE user ADD `name` text NOT NULL;
ALTER TABLE user ADD `is_email_verified` integer DEFAULT false;
ALTER TABLE user ADD `avatar_url` text;
CREATE UNIQUE INDEX `newsletter_email_idx` ON `newsletter` (`email`);
CREATE UNIQUE INDEX `post_name_idx` ON `post` (`name`);
CREATE INDEX `post_main_tag_idx` ON `post` (`main_tag`);
CREATE INDEX `tags_id_idx` ON `tags` (`id`);
CREATE UNIQUE INDEX `tags_email_idx` ON `tags` (`name`);
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);