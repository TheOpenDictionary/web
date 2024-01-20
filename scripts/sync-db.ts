import { MeiliSearch } from 'meilisearch';

const ms = new MeiliSearch({
	host: 'http://127.0.0.1:7700',
	apiKey: '3OF83dZ0dl-3Am85Va9eri9IrQZob22pD91hRXlvbXU'
});

import pg from 'pg';
import dotenv from 'dotenv';

import { drizzle } from 'drizzle-orm/node-postgres';

import * as schema from '../db/schema';
import { entries } from '../db/schema';
import { count, eq, placeholder, sql } from 'drizzle-orm';

dotenv.config();

const { Client } = pg;

const client = new Client({ connectionString: process.env.DATABASE_URL });

await client.connect();

const db = drizzle(client, { schema });

const totalCount = await db.select({ value: count() }).from(entries);

const query = await db.query.entries
	.findMany({
		limit: sql.placeholder('limit'),
		offset: sql.placeholder('offset'),
		orderBy: entries.id,
		with: {
			etymologies: {
				with: {
					senses: {
						with: {
							definitions: {
								with: {
									examples: true,
									notes: true
								}
							},
							groups: {
								with: {
									definitions: {
										with: {
											examples: true,
											notes: true
										}
									}
								}
							}
						}
					}
				}
			}
		}
	})
	.prepare('query');

for (let i = 0; i < totalCount[0].value; i += 1000) {
	const results = await query.execute({ limit: 1000, offset: i });
	await ms.index('entries').addDocuments(results);
	console.log(`Indexed ${i} of ${totalCount[0].value}`);
}

await client.end();
