import 'dotenv/config';
import type { Config } from 'drizzle-kit';
import dotenv from 'dotenv';
dotenv.config();

export default {
	schema: 'src/lib/server/schema.ts',
	out: './drizzle',
	driver: 'turso',
	breakpoints: false,
	strict: false,
	verbose: true,
	dbCredentials: {
		url: process.env.DATABASE_URL!,
		authToken: process.env.DATABASE_AUTH_TOKEN!
	}
} satisfies Config;
