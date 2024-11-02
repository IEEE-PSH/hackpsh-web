CREATE SCHEMA "app_schema";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_schema"."app_announcement" (
	"announcement_uuid" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"announcement_created_at" timestamp DEFAULT now() NOT NULL,
	"announcement_author_uuid" uuid,
	"announcement_id" serial NOT NULL,
	"announcement_title" text NOT NULL,
	"announcement_content" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_schema"."app_challenges" (
	"challenge_uuid" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"challenge_id" serial NOT NULL,
	"challenge_title" text NOT NULL,
	"challenge_difficulty" text NOT NULL,
	"challenge_points" integer DEFAULT 0 NOT NULL,
	"challenge_description" text NOT NULL,
	"challenge_function_header" text NOT NULL,
	"challenge_example_input" text NOT NULL,
	"challenge_example_output" text NOT NULL,
	"challenge_explanation" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_schema"."app_contact" (
	"contact_uuid" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"contact_created_at" timestamp DEFAULT now() NOT NULL,
	"contact_first_name" text NOT NULL,
	"contact_last_name" text NOT NULL,
	"contact_email" text NOT NULL,
	"contact_content" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_schema"."app_difficulty" (
	"difficulty_id" serial PRIMARY KEY NOT NULL,
	"difficulty_name" text NOT NULL,
	CONSTRAINT "app_difficulty_difficulty_name_unique" UNIQUE("difficulty_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_schema"."app_event" (
	"event_id" integer PRIMARY KEY NOT NULL,
	"event_date" text NOT NULL,
	"event_start_time" text NOT NULL,
	"event_end_time" text NOT NULL,
	"event_start_hour" integer NOT NULL,
	"event_duration" integer NOT NULL,
	"event_challenges_enabled" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_schema"."app_major" (
	"major_id" serial PRIMARY KEY NOT NULL,
	"major_name" text NOT NULL,
	CONSTRAINT "app_major_major_name_unique" UNIQUE("major_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_schema"."app_onboarding_phase" (
	"phase_id" serial PRIMARY KEY NOT NULL,
	"phase_name" text NOT NULL,
	CONSTRAINT "app_onboarding_phase_phase_name_unique" UNIQUE("phase_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_schema"."app_role" (
	"role_id" serial PRIMARY KEY NOT NULL,
	"role_name" text NOT NULL,
	CONSTRAINT "app_role_role_name_unique" UNIQUE("role_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_schema"."app_school_year" (
	"school_year_id" serial PRIMARY KEY NOT NULL,
	"school_year_name" text NOT NULL,
	CONSTRAINT "app_school_year_school_year_name_unique" UNIQUE("school_year_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_schema"."app_solved_challenges" (
	"solved_challenge_uuid" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"solved_challenge_foreign_uuid" uuid,
	"solved_challenge_team_uuid" uuid NOT NULL,
	"solved_challenge_code_submission" text,
	"solved_challenge_language" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_schema"."app_team" (
	"team_uuid" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"team_name" text NOT NULL,
	"team_code" text NOT NULL,
	"team_points" integer DEFAULT 0 NOT NULL,
	"team_points_additive" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "app_team_team_name_unique" UNIQUE("team_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_schema"."app_test_cases" (
	"test_case_uuid" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"test_case_input" text NOT NULL,
	"test_case_output" text NOT NULL,
	"test_case_challenge_uuid" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_schema"."app_user_profile" (
	"user_uuid" uuid PRIMARY KEY NOT NULL,
	"user_email_address" text NOT NULL,
	"user_avatar_url" text,
	"user_onboarding_complete" boolean,
	"user_display_name" text,
	"user_first_name" text,
	"user_last_name" text,
	"user_resume_url" text,
	"user_team_uuid" uuid,
	"user_school_year" text,
	"user_major" text,
	"user_role" text DEFAULT 'participant' NOT NULL,
	"user_support_administrative" boolean DEFAULT false,
	"user_support_technical" boolean DEFAULT false,
	"user_onboarding_phase" text DEFAULT 'personal-details' NOT NULL,
	"user_team_leader" boolean DEFAULT false,
	CONSTRAINT "app_user_profile_user_email_address_unique" UNIQUE("user_email_address"),
	CONSTRAINT "app_user_profile_user_display_name_unique" UNIQUE("user_display_name")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_schema"."app_announcement" ADD CONSTRAINT "app_announcement_announcement_author_uuid_app_user_profile_user_uuid_fk" FOREIGN KEY ("announcement_author_uuid") REFERENCES "app_schema"."app_user_profile"("user_uuid") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_schema"."app_challenges" ADD CONSTRAINT "app_challenges_challenge_difficulty_app_difficulty_difficulty_name_fk" FOREIGN KEY ("challenge_difficulty") REFERENCES "app_schema"."app_difficulty"("difficulty_name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_schema"."app_solved_challenges" ADD CONSTRAINT "app_solved_challenges_solved_challenge_foreign_uuid_app_challenges_challenge_uuid_fk" FOREIGN KEY ("solved_challenge_foreign_uuid") REFERENCES "app_schema"."app_challenges"("challenge_uuid") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_schema"."app_solved_challenges" ADD CONSTRAINT "app_solved_challenges_solved_challenge_team_uuid_app_team_team_uuid_fk" FOREIGN KEY ("solved_challenge_team_uuid") REFERENCES "app_schema"."app_team"("team_uuid") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_schema"."app_test_cases" ADD CONSTRAINT "app_test_cases_test_case_challenge_uuid_app_challenges_challenge_uuid_fk" FOREIGN KEY ("test_case_challenge_uuid") REFERENCES "app_schema"."app_challenges"("challenge_uuid") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_schema"."app_user_profile" ADD CONSTRAINT "app_user_profile_user_team_uuid_app_team_team_uuid_fk" FOREIGN KEY ("user_team_uuid") REFERENCES "app_schema"."app_team"("team_uuid") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_schema"."app_user_profile" ADD CONSTRAINT "app_user_profile_user_school_year_app_school_year_school_year_name_fk" FOREIGN KEY ("user_school_year") REFERENCES "app_schema"."app_school_year"("school_year_name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_schema"."app_user_profile" ADD CONSTRAINT "app_user_profile_user_major_app_major_major_name_fk" FOREIGN KEY ("user_major") REFERENCES "app_schema"."app_major"("major_name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_schema"."app_user_profile" ADD CONSTRAINT "app_user_profile_user_role_app_role_role_name_fk" FOREIGN KEY ("user_role") REFERENCES "app_schema"."app_role"("role_name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_schema"."app_user_profile" ADD CONSTRAINT "app_user_profile_user_onboarding_phase_app_onboarding_phase_phase_name_fk" FOREIGN KEY ("user_onboarding_phase") REFERENCES "app_schema"."app_onboarding_phase"("phase_name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_uuid_index" ON "app_schema"."app_user_profile" USING btree ("user_uuid");

/*MANUAL RLS ENABLES*/
ALTER TABLE "app_schema"."app_announcement" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "app_schema"."app_challenges" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "app_schema"."app_contact" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "app_schema"."app_difficulty" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "app_schema"."app_event" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "app_schema"."app_major" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "app_schema"."app_role" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "app_schema"."app_school_year" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "app_schema"."app_solved_challenges" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "app_schema"."app_team" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "app_schema"."app_test_cases" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "app_schema"."app_user_profile" ENABLE ROW LEVEL SECURITY;

/*MANUAL READ ACCESS FOR REALTIME TABLES*/
CREATE POLICY "Enable read access for all users" ON "app_schema"."app_team" AS PERMISSIVE FOR SELECT TO authenticated USING (true);
ALTER publication supabase_realtime ADD TABLE "app_schema"."app_team";

CREATE POLICY "Enable read access for all users" ON "app_schema"."app_event" AS PERMISSIVE FOR SELECT TO authenticated USING (true);
ALTER publication supabase_realtime ADD TABLE "app_schema"."app_event";

CREATE POLICY "Enable read access for all users" ON "app_schema"."app_solved_challenges" AS PERMISSIVE FOR SELECT TO authenticated USING (true);
ALTER publication supabase_realtime ADD TABLE "app_schema"."app_solved_challenges";

CREATE POLICY "Enable read access for all users" ON "app_schema"."app_announcement" AS PERMISSIVE FOR SELECT TO authenticated USING (true);
ALTER publication supabase_realtime ADD TABLE "app_schema"."app_announcement";