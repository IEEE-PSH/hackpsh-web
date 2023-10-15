DO $$ BEGIN
 CREATE TYPE "class_year" AS ENUM('middle_school', 'high_school', 'freshman', 'sophmore', 'junior', 'senior', 'graduate', 'post_graduate');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_user_profile" (
	"user_uuid" uuid PRIMARY KEY NOT NULL,
	"user_email_address" text NOT NULL,
	"user_avatar_url" text,
	"user_onboarding_complete" boolean,
	"user_display_name" text NOT NULL,
	"user_class_year" "class_year" NOT NULL,
	CONSTRAINT "app_user_profile_user_email_address_unique" UNIQUE("user_email_address"),
	CONSTRAINT "app_user_profile_user_display_name_unique" UNIQUE("user_display_name")
);
CREATE INDEX IF NOT EXISTS "user_uuid_index" ON "app_user_profile" ("user_uuid");
--> statement-breakpoint
ALTER TABLE app_user_profile ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
CREATE POLICY "User Profile is viewable only by authenticated users"
ON app_user_profile FOR SELECT
TO authenticated
USING ( TRUE );
--> statement-breakpoint