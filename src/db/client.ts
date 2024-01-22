import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';

import { DATABASE_URL } from '$env/static/private';

import * as schema from './schema';

const { Client } = pg;

const client = new Client({ connectionString: DATABASE_URL });

await client.connect();

export const db = drizzle(client, { schema });
