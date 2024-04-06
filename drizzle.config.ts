import type { Config } from 'drizzle-kit';
import { DATABASE_URL, DATABASE_AUTH_TOKEN } from '$env/static/private';
// import dotenv from 'dotenv';
// dotenv.config();

export default {
	schema: 'src/lib/server/schema.ts',
	out: './drizzle',
	driver: 'turso',
	breakpoints: false,
	strict: false,
	verbose: true,
	dbCredentials: {
		// url: process.env.DATABASE_URL!,
		// authToken: process.env.DATABASE_AUTH_TOKEN!,
		url: DATABASE_URL!,
		authToken: DATABASE_AUTH_TOKEN!
	}
} satisfies Config;
