import type { Config } from 'drizzle-kit';

export default {
	schema: './src/db/schema.ts',
	out: './src/db',
	driver: 'pg',
	dbCredentials: {
		connectionString: 'postgresql://127.0.0.1:5432/tjnickerson'
	}
} satisfies Config;
