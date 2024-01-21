import dotenv from 'dotenv';
import { eq, sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import { alias } from 'drizzle-orm/pg-core';
import { MeiliSearch } from 'meilisearch';
import pg from 'pg';

import * as schema from '../db/schema';

dotenv.config();

const ms = new MeiliSearch({
	host: process.env.MEILISEARCH_HOST ?? '',
	apiKey: process.env.MEILISEARCH_KEY ?? ''
});

const { Client } = pg;

const client = new Client({ connectionString: process.env.DATABASE_URL });

await client.connect();

const db = drizzle(client, { schema });

const senseDefinitions = alias(schema.definitions, 'sense_definition');

const groupDefinitions = alias(schema.definitions, 'group_definition');

const grouping = db
	.select({
		term: schema.entries.term,
		definitions: sql`string_agg(${senseDefinitions.value}, '; ')`.as('definitions')
	})
	.from(schema.entries)
	.leftJoin(schema.dictionaries, eq(schema.dictionaries.id, schema.entries.dictionaryId))
	.leftJoin(schema.etymologies, eq(schema.etymologies.entryId, schema.entries.id))
	.leftJoin(schema.senses, eq(schema.senses.etymologyId, schema.etymologies.id))
	.leftJoin(schema.groups, eq(schema.groups.senseId, schema.senses.id))
	.leftJoin(senseDefinitions, eq(senseDefinitions.senseId, schema.senses.id))
	.leftJoin(groupDefinitions, eq(groupDefinitions.groupId, schema.groups.id))
	.groupBy(schema.entries.term)
	.as('grouping');

const rows = await db
	.select({
		id: schema.entries.id,
		term: grouping.term,
		definitions: grouping.definitions,
		sourceLanguage: schema.dictionaries.sourceLanguage,
		targetLanguage: schema.dictionaries.targetLanguage
	})
	.from(grouping)
	.leftJoin(schema.entries, eq(schema.entries.term, grouping.term))
	.leftJoin(schema.dictionaries, eq(schema.dictionaries.id, schema.entries.dictionaryId));

const idx = ms.index('entries');

await idx.addDocumentsInBatches(rows, 100_000, { primaryKey: 'id' });
await idx.updateSearchableAttributes(['term', 'definitions']);
await idx.updateFilterableAttributes(['sourceLanguage', 'targetLanguage']);

await client.end();
