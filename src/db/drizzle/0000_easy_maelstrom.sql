CREATE SCHEMA "app_schema";
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "app_schema"."class_year" AS ENUM('middle_school', 'high_school', 'freshman', 'sophmore', 'junior', 'senior', 'graduate', 'post_graduate');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_schema"."app_user_profile" (
	"user_uuid" uuid PRIMARY KEY NOT NULL,
	"user_email_address" text NOT NULL,
	"user_avatar_url" text,
	"user_onboarding_complete" boolean,
	"user_display_name" text NOT NULL,
	"user_class_year" "app_schema"."class_year" NOT NULL,
	CONSTRAINT "app_user_profile_user_email_address_unique" UNIQUE("user_email_address"),
	CONSTRAINT "app_user_profile_user_display_name_unique" UNIQUE("user_display_name")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_uuid_index" ON "app_schema"."app_user_profile" ("user_uuid");