import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
	schema: 'src/lib/server/schema.ts',
	out: './drizzle',
	driver: 'libsql',
	breakpoints: false,
	strict: false,
	verbose: true
} satisfies Config;
