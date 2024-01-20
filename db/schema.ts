import { relations } from 'drizzle-orm';
import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';

export const dictionaries = pgTable('dictionaries', {
	id: uuid('id').primaryKey().notNull(),
	name: text('name').notNull(),
	sourceLanguage: text('source_language').notNull().default('en'),
	targetLanguage: text('target_language').notNull().default('en')
});

export const dictionaryRelations = relations(dictionaries, ({ many }) => ({
	entries: many(entries, { relationName: 'entries' })
}));

export const entries = pgTable('entries', {
	id: uuid('id').primaryKey().notNull(),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).defaultNow(),
	updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' }),
	term: text('term').notNull(),
	dictionaryId: uuid('dictionary_id').references(() => dictionaries.id)
});

export const entryRelations = relations(entries, ({ one, many }) => ({
	dictionary: one(dictionaries, {
		fields: [entries.dictionaryId],
		references: [dictionaries.id],
		relationName: 'dictionary'
	}),
	etymologies: many(etymologies, { relationName: 'etymologies' })
}));

export const etymologies = pgTable('etymologies', {
	id: uuid('id').primaryKey().notNull(),
	description: text('description'),
	entryId: uuid('entry_id')
		.notNull()
		.references(() => entries.id)
});

export const etymologyRelations = relations(etymologies, ({ one, many }) => ({
	entry: one(entries, {
		fields: [etymologies.entryId],
		references: [entries.id],
		relationName: 'entry'
	}),
	senses: many(senses, { relationName: 'senses' })
}));

export const senses = pgTable('senses', {
	id: uuid('id').primaryKey().notNull(),
	etymologyId: uuid('etymology_id')
		.notNull()
		.references(() => etymologies.id)
});

export const senseRelations = relations(senses, ({ one, many }) => ({
	etymology: one(etymologies, {
		fields: [senses.etymologyId],
		references: [etymologies.id],
		relationName: 'etymology'
	}),
	groups: many(groups, { relationName: 'groups' }),
	definitions: many(groups, { relationName: 'definitions' })
}));

export const groups = pgTable('groups', {
	id: uuid('id').primaryKey().notNull(),
	description: text('description'),
	senseId: uuid('sense_id')
		.notNull()
		.references(() => senses.id)
});

export const definitions = pgTable('definitions', {
	id: uuid('id').primaryKey().notNull(),
	value: text('value').notNull(),
	senseId: uuid('sense_id').references(() => senses.id),
	groupId: uuid('group_id').references(() => groups.id)
});

export const notes = pgTable('notes', {
	id: uuid('id').primaryKey().notNull(),
	value: text('value'),
	definitionId: uuid('definition_id')
		.notNull()
		.references(() => definitions.id)
});

export const examples = pgTable('examples', {
	id: text('id').primaryKey().notNull(),
	text: text('text').notNull(),
	definitionId: uuid('definition_id').references(() => definitions.id),
	noteId: uuid('note_id').references(() => notes.id)
});
