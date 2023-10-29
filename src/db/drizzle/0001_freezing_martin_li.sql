CREATE TABLE IF NOT EXISTS "app_schema"."app_school_year" (
	"school_year_id" serial PRIMARY KEY NOT NULL,
	"school_year_name" text NOT NULL,
	CONSTRAINT "app_school_year_school_year_name_unique" UNIQUE("school_year_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_schema"."app_team" (
	"team_uuid" uuid PRIMARY KEY NOT NULL,
	"team_name" text NOT NULL,
	"team_code" text,
	"team_points" integer DEFAULT 0,
	CONSTRAINT "app_team_team_name_unique" UNIQUE("team_name"),
	CONSTRAINT "app_team_team_code_unique" UNIQUE("team_code")
);
--> statement-breakpoint
ALTER TABLE "app_schema"."app_user_profile" RENAME COLUMN "user_class_year" TO "user_school_year";--> statement-breakpoint
ALTER TABLE "app_schema"."app_user_profile" ALTER COLUMN "user_school_year" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "app_schema"."app_user_profile" ALTER COLUMN "user_school_year" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "app_schema"."app_user_profile" ADD COLUMN "user_resume_url" text;--> statement-breakpoint
ALTER TABLE "app_schema"."app_user_profile" ADD COLUMN "user_team_uuid" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_schema"."app_user_profile" ADD CONSTRAINT "app_user_profile_user_team_uuid_app_team_team_uuid_fk" FOREIGN KEY ("user_team_uuid") REFERENCES "app_schema"."app_team"("team_uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_schema"."app_user_profile" ADD CONSTRAINT "app_user_profile_user_school_year_app_school_year_school_year_name_fk" FOREIGN KEY ("user_school_year") REFERENCES "app_schema"."app_school_year"("school_year_name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
