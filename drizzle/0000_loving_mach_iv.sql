CREATE TABLE `newsletter` (
	`email` text PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL,
	`is_subscribed` integer NOT NULL
);

CREATE TABLE `post` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`image_url` text NOT NULL,
	`video_url` text NOT NULL,
	`main_tag` text NOT NULL,
	`created_at` integer NOT NULL
);

CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);

CREATE TABLE `tags_mapping` (
	`post_reference` integer PRIMARY KEY NOT NULL,
	`tag_reference` integer
);

CREATE TABLE `tags` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);

CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`liked_posts` text NOT NULL
);

CREATE UNIQUE INDEX `email_idx` ON `newsletter` (`email`);
CREATE UNIQUE INDEX `email_idx` ON `post` (`name`);
CREATE INDEX `main_tag_idx` ON `post` (`main_tag`);
CREATE INDEX `post_reference_idx` ON `tags_mapping` (`post_reference`);
CREATE INDEX `id_idx` ON `tags` (`id`);
CREATE UNIQUE INDEX `email_idx` ON `tags` (`name`);