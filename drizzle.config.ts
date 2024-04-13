import type { Config } from 'drizzle-kit';
import { config } from 'dotenv';
config();

export default {
	schema: 'src/lib/server/schema.ts',
	out: './drizzle',
	driver: 'turso',
	breakpoints: false,
	strict: false,
	verbose: true,
	dbCredentials: {
		url: String(process.env.DATABASE_URL),
		authToken: String(process.env.DATABASE_AUTH_TOKEN)
	}
} satisfies Config;
