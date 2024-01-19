import type { Config } from 'drizzle-kit';

export default {
	schema: './db/schema.ts',
	out: './db',
	driver: 'pg',
	dbCredentials: {
		connectionString: 'postgresql://127.0.0.1:5432/tjnickerson'
	}
} satisfies Config;
