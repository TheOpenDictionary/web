import pg from 'pg';

import { drizzle } from 'drizzle-orm/node-postgres';
import { DATABASE_URL } from '$env/static/private';

const { Client } = pg;

import * as schema from './schema';

const client = new Client({ connectionString: DATABASE_URL });

await client.connect();

export const db = drizzle(client, { schema });
