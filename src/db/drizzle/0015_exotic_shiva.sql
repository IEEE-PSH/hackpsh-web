ALTER TABLE "app_schema"."app_announcement" DROP CONSTRAINT "app_announcement_announcement_author_uuid_app_user_profile_user_uuid_fk";
--> statement-breakpoint
ALTER TABLE "app_schema"."app_user_profile" DROP CONSTRAINT "app_user_profile_user_team_uuid_app_team_team_uuid_fk";
--> statement-breakpoint
ALTER TABLE "app_schema"."app_user_profile" DROP CONSTRAINT "app_user_profile_user_school_year_app_school_year_school_year_name_fk";
--> statement-breakpoint
ALTER TABLE "app_schema"."app_user_profile" DROP CONSTRAINT "app_user_profile_user_major_app_major_major_name_fk";
--> statement-breakpoint
ALTER TABLE "app_schema"."app_user_profile" DROP CONSTRAINT "app_user_profile_user_role_app_role_role_name_fk";
--> statement-breakpoint
ALTER TABLE "app_schema"."app_user_profile" DROP CONSTRAINT "app_user_profile_user_onboarding_phase_app_onboarding_phase_phase_name_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_schema"."app_announcement" ADD CONSTRAINT "app_announcement_announcement_author_uuid_app_user_profile_user_uuid_fk" FOREIGN KEY ("announcement_author_uuid") REFERENCES "app_schema"."app_user_profile"("user_uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
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
