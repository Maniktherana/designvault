import { dev } from '$app/environment';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL } from '$env/static/private';

import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import { Google } from 'arctic';
import { Lucia } from 'lucia';

import { sessionTable, userTable } from './schema';
import { db } from './db';

const dbAdapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);

const googleRedirectUrl = `${BASE_URL}/login/google/callback`;

export const googleOauth = new Google(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, googleRedirectUrl);

export const lucia = new Lucia(dbAdapter, {
	sessionCookie: {
		attributes: {
			secure: !dev
		}
	},

	getUserAttributes: (attributes) => {
		return {
			name: attributes.name,
			email: attributes.email,
			avatarUrl: attributes.avatarUrl,
			isEmailVerified: attributes.isEmailVerified,
			admin: attributes.admin
		};
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: {
			name: string;
			email: string;
			isEmailVerified: boolean;
			avatarUrl: string;
			admin: boolean;
		};
	}
}
