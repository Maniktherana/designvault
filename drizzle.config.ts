import 'dotenv/config';
import type { Config } from 'drizzle-kit';
import { DATABASE_URL, DATABASE_AUTH_TOKEN } from '$env/static/private';

export default {
	schema: 'src/lib/server/schema.ts',
	out: './drizzle',
	driver: 'turso',
	breakpoints: false,
	strict: false,
	verbose: true,
	dbCredentials: {
		url: DATABASE_URL,
		authToken: DATABASE_AUTH_TOKEN
	}
} satisfies Config;
