ALTER TABLE "app_schema"."app_documents" ADD COLUMN "document_team_uuid" uuid;--> statement-breakpoint
ALTER TABLE "app_schema"."app_documents" ADD COLUMN "document_challenge_uuid" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_schema"."app_documents" ADD CONSTRAINT "app_documents_document_team_uuid_app_team_team_uuid_fk" FOREIGN KEY ("document_team_uuid") REFERENCES "app_schema"."app_team"("team_uuid") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_schema"."app_documents" ADD CONSTRAINT "app_documents_document_challenge_uuid_app_challenges_challenge_uuid_fk" FOREIGN KEY ("document_challenge_uuid") REFERENCES "app_schema"."app_challenges"("challenge_uuid") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "app_schema"."app_documents" ENABLE ROW LEVEL SECURITY;