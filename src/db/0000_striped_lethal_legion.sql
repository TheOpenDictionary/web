CREATE TABLE IF NOT EXISTS "dictionaries" (
  "id" uuid PRIMARY KEY NOT NULL,
  "name" text NOT NULL
);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "entries" (
  "id" uuid PRIMARY KEY NOT NULL,
  "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp with time zone,
  "term" text NOT NULL,
  "dictionary_id" uuid
);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "etymologies" (
  "id" uuid PRIMARY KEY NOT NULL,
  "description" text,
  "entry_id" uuid NOT NULL
);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "senses" (
  "id" uuid PRIMARY KEY NOT NULL,
  "etymology_id" uuid NOT NULL
);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "groups" (
  "id" uuid PRIMARY KEY NOT NULL,
  "description" text,
  "sense_id" uuid NOT NULL
);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "definitions" (
  "id" uuid PRIMARY KEY NOT NULL,
  "value" text NOT NULL,
  "sense_id" uuid,
  "group_id" uuid
);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "notes" (
  "id" uuid PRIMARY KEY NOT NULL,
  "value" text,
  "definition_id" uuid NOT NULL
);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "examples" (
  "id" text PRIMARY KEY NOT NULL,
  "text" text NOT NULL,
  "definition_id" uuid,
  "note_id" uuid
);

--> statement-breakpoint
DO $ $ BEGIN
ALTER TABLE
  "entries"
ADD
  CONSTRAINT "entries_dictionary_id_fkey" FOREIGN KEY ("dictionary_id") REFERENCES "public"."dictionaries"("id") ON DELETE no action ON UPDATE no action;

EXCEPTION
WHEN duplicate_object THEN null;

END $ $;

--> statement-breakpoint
DO $ $ BEGIN
ALTER TABLE
  "etymologies"
ADD
  CONSTRAINT "etymologies_entry_id_fkey" FOREIGN KEY ("entry_id") REFERENCES "public"."entries"("id") ON DELETE no action ON UPDATE no action;

EXCEPTION
WHEN duplicate_object THEN null;

END $ $;

--> statement-breakpoint
DO $ $ BEGIN
ALTER TABLE
  "senses"
ADD
  CONSTRAINT "senses_etymology_id_fkey" FOREIGN KEY ("etymology_id") REFERENCES "public"."etymologies"("id") ON DELETE no action ON UPDATE no action;

EXCEPTION
WHEN duplicate_object THEN null;

END $ $;

--> statement-breakpoint
DO $ $ BEGIN
ALTER TABLE
  "groups"
ADD
  CONSTRAINT "groups_sense_id_fkey" FOREIGN KEY ("sense_id") REFERENCES "public"."senses"("id") ON DELETE no action ON UPDATE no action;

EXCEPTION
WHEN duplicate_object THEN null;

END $ $;

--> statement-breakpoint
DO $ $ BEGIN
ALTER TABLE
  "definitions"
ADD
  CONSTRAINT "definitions_sense_id_fkey" FOREIGN KEY ("sense_id") REFERENCES "public"."senses"("id") ON DELETE no action ON UPDATE no action;

EXCEPTION
WHEN duplicate_object THEN null;

END $ $;

--> statement-breakpoint
DO $ $ BEGIN
ALTER TABLE
  "definitions"
ADD
  CONSTRAINT "definitions_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE no action ON UPDATE no action;

EXCEPTION
WHEN duplicate_object THEN null;

END $ $;

--> statement-breakpoint
DO $ $ BEGIN
ALTER TABLE
  "notes"
ADD
  CONSTRAINT "notes_definition_id_fkey" FOREIGN KEY ("definition_id") REFERENCES "public"."definitions"("id") ON DELETE no action ON UPDATE no action;

EXCEPTION
WHEN duplicate_object THEN null;

END $ $;

--> statement-breakpoint
DO $ $ BEGIN
ALTER TABLE
  "examples"
ADD
  CONSTRAINT "examples_definition_id_fkey" FOREIGN KEY ("definition_id") REFERENCES "public"."definitions"("id") ON DELETE no action ON UPDATE no action;

EXCEPTION
WHEN duplicate_object THEN null;

END $ $;

--> statement-breakpoint
DO $ $ BEGIN
ALTER TABLE
  "examples"
ADD
  CONSTRAINT "examples_note_id_fkey" FOREIGN KEY ("note_id") REFERENCES "public"."notes"("id") ON DELETE no action ON UPDATE no action;

EXCEPTION
WHEN duplicate_object THEN null;

END $ $;