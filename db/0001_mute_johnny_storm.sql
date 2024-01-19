ALTER TABLE "entries" DROP CONSTRAINT "entries_dictionary_id_fkey";
--> statement-breakpoint
ALTER TABLE "etymologies" DROP CONSTRAINT "etymologies_entry_id_fkey";
--> statement-breakpoint
ALTER TABLE "senses" DROP CONSTRAINT "senses_etymology_id_fkey";
--> statement-breakpoint
ALTER TABLE "groups" DROP CONSTRAINT "groups_sense_id_fkey";
--> statement-breakpoint
ALTER TABLE "definitions" DROP CONSTRAINT "definitions_sense_id_fkey";
--> statement-breakpoint
ALTER TABLE "definitions" DROP CONSTRAINT "definitions_group_id_fkey";
--> statement-breakpoint
ALTER TABLE "notes" DROP CONSTRAINT "notes_definition_id_fkey";
--> statement-breakpoint
ALTER TABLE "examples" DROP CONSTRAINT "examples_definition_id_fkey";
--> statement-breakpoint
ALTER TABLE "examples" DROP CONSTRAINT "examples_note_id_fkey";
--> statement-breakpoint
ALTER TABLE "entries" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "dictionaries" ADD COLUMN "source_language" text DEFAULT 'en' NOT NULL;--> statement-breakpoint
ALTER TABLE "dictionaries" ADD COLUMN "target_language" text DEFAULT 'en' NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "entries" ADD CONSTRAINT "entries_dictionary_id_dictionaries_id_fk" FOREIGN KEY ("dictionary_id") REFERENCES "dictionaries"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "etymologies" ADD CONSTRAINT "etymologies_entry_id_entries_id_fk" FOREIGN KEY ("entry_id") REFERENCES "entries"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "senses" ADD CONSTRAINT "senses_etymology_id_etymologies_id_fk" FOREIGN KEY ("etymology_id") REFERENCES "etymologies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "groups" ADD CONSTRAINT "groups_sense_id_senses_id_fk" FOREIGN KEY ("sense_id") REFERENCES "senses"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "definitions" ADD CONSTRAINT "definitions_sense_id_senses_id_fk" FOREIGN KEY ("sense_id") REFERENCES "senses"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "definitions" ADD CONSTRAINT "definitions_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "notes" ADD CONSTRAINT "notes_definition_id_definitions_id_fk" FOREIGN KEY ("definition_id") REFERENCES "definitions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "examples" ADD CONSTRAINT "examples_definition_id_definitions_id_fk" FOREIGN KEY ("definition_id") REFERENCES "definitions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "examples" ADD CONSTRAINT "examples_note_id_notes_id_fk" FOREIGN KEY ("note_id") REFERENCES "notes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
