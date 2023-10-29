CREATE TABLE IF NOT EXISTS "app_schema"."app_announcement" (
	"announcement_uuid" uuid PRIMARY KEY NOT NULL,
	"announcement_created_at" timestamp DEFAULT now(),
	"announcement_author" uuid NOT NULL,
	"announcement_content" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_schema"."app_announcement" ADD CONSTRAINT "app_announcement_announcement_author_app_user_profile_user_uuid_fk" FOREIGN KEY ("announcement_author") REFERENCES "app_schema"."app_user_profile"("user_uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
