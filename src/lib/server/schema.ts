import { sqliteTable, text, integer, index, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const userTable = sqliteTable('user', {
	id: text('id').notNull().primaryKey(),
	email: text('email').notNull().unique(),
	name: text('name').notNull(),
	isEmailVerified: integer('is_email_verified', { mode: 'boolean' }).default(false),
	avatarUrl: text('avatar_url'),
	likedPosts: text('liked_posts'),
	admin: integer('admin', { mode: 'boolean' }).default(false)
});

export const postTable = sqliteTable(
	'post',
	{
		id: integer('id').notNull().primaryKey(),
		name: text('name').notNull(),
		websiteUrl: text('website_url').notNull(),
		imageUrl: text('image_url').notNull(),
		videoUrl: text('video_url').notNull(),
		mainTag: text('main_tag').notNull(),
		likes: integer('likes').default(0).notNull(),
		createdAt: integer('created_at').notNull().default(Date.now())
	},
	(table) => {
		return {
			nameIdx: uniqueIndex('post_name_idx').on(table.name),
			mainTagIdx: index('post_main_tag_idx').on(table.mainTag)
		};
	}
);

export const tagsTable = sqliteTable(
	'tags',
	{
		id: integer('id').notNull().primaryKey(),
		name: text('name').notNull()
	},
	(table) => {
		return {
			idIdx: index('tags_id_idx').on(table.id),
			nameIdx: uniqueIndex('tags_name_idx').on(table.name)
		};
	}
);

export const tagsMappingTable = sqliteTable(
	'tags_mapping',
	{
		postReference: integer('post_reference').primaryKey(),
		tagReference: integer('tag_reference')
	},
	(table) => {
		return {
			postReferenceIdx: index('post_reference_idx').on(table.postReference)
		};
	}
);

export const sessionTable = sqliteTable('session', {
	id: text('id').notNull().primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	expiresAt: integer('expires_at').notNull()
});

export const emailVerificationCodesTable = sqliteTable('email_verification_codes', {
	id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	code: text('code').notNull(),
	email: text('email').notNull(),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

export const newsletterTable = sqliteTable(
	'newsletter',
	{
		email: text('email').notNull().primaryKey(),
		createdAt: integer('created_at').notNull(),
		isSubscribed: integer('is_subscribed', { mode: 'boolean' }).default(false).notNull()
	},
	(table) => {
		return {
			emailIdx: uniqueIndex('newsletter_email_idx').on(table.email)
		};
	}
);

export type UserInsertSchema = typeof userTable.$inferInsert;
export type PostSelectSchema = typeof postTable.$inferSelect;
