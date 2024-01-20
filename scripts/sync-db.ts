// import { MeiliSearch } from 'meilisearch';

// const client = new MeiliSearch({
// 	host: 'http://127.0.0.1:7700',
// 	apiKey: '3OF83dZ0dl-3Am85Va9eri9IrQZob22pD91hRXlvbXU'
// });

import pg from 'pg';
import dotenv from 'dotenv';

import { drizzle } from 'drizzle-orm/node-postgres';

import * as schema from '../db/schema';

dotenv.config();

const { Client } = pg;

const client = new Client({ connectionString: process.env.DATABASE_URL });

await client.connect();

const db = drizzle(client, { schema });

const entries = await db.query.entries.findMany({
	with: {
		dictionary: true
	}
});

console.log(entries.length);

await client.end();
