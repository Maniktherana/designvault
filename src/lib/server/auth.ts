import { dev } from '$app/environment';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';

import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import { Google } from 'arctic';
import { Lucia } from 'lucia';

import { sessionTable, userTable } from './schema';
import { db } from './db';

const dbAdapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);

const googleRedirectUrl = `http://localhost:5173/auth/oauth/google/callback`;

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
			isEmailVerified: attributes.isEmailVerified
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
		};
	}
}
