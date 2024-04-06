import type { Cookies } from '@sveltejs/kit';

import { eq } from 'drizzle-orm';
import { type Lucia } from 'lucia';

import { db } from './db';
import { userTable, type UserInsertSchema } from './schema';

export const GITHUB_OAUTH_STATE_COOKIE_NAME = 'githubOauthState';
export const GOOGLE_OAUTH_STATE_COOKIE_NAME = 'googleOauthState';
export const GOOGLE_OAUTH_CODE_VERIFIER_COOKIE_NAME = 'googleOauthCodeVerifier';

export const PENDING_USER_VERIFICATION_COOKIE_NAME = 'pendingUserVerification';
export type PendingVerificationUserDataType = {
	id: string;
	email: string;
};

export const createAndSetSession = async (lucia: Lucia, userId: string, cookies: Cookies) => {
	const session = await lucia.createSession(userId, {});
	const sessionCookie = lucia.createSessionCookie(session.id);

	cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '.',
		...sessionCookie.attributes
	});
};

export const deleteSessionCookie = async (lucia: Lucia, cookies: Cookies) => {
	const sessionCookie = lucia.createBlankSessionCookie();

	cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '.',
		...sessionCookie.attributes
	});
};

export const checkIfUserExists = async (email: string) => {
	const [existingUser] = await db
		.select({
			id: userTable.id,
			email: userTable.email,
			isEmailVerified: userTable.isEmailVerified
		})
		.from(userTable)
		.where(eq(userTable.email, email));

	return existingUser;
};

export const insertNewUser = async (user: UserInsertSchema) => {
	return await db.insert(userTable).values(user);
};

export const getAllUsers = async () => {
	const queryResult = await db
		.select({
			id: userTable.id,
			name: userTable.name,
			email: userTable.email
		})
		.from(userTable);

	return queryResult;
};

export const deleteAllUsers = async () => {
	return await db.delete(userTable);
};
