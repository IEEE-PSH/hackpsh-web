CREATE TABLE IF NOT EXISTS "app_schema"."app_documents" (
	"document_uuid" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"document_object" json NOT NULL
);
--> statement-breakpoint
ALTER TABLE "app_schema"."app_solved_challenges" DROP COLUMN IF EXISTS "solved_challenge_live";