ALTER TABLE "app_schema"."app_user_profile" DROP CONSTRAINT "app_user_profile_user_team_uuid_app_team_team_uuid_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_schema"."app_user_profile" ADD CONSTRAINT "app_user_profile_user_team_uuid_app_team_team_uuid_fk" FOREIGN KEY ("user_team_uuid") REFERENCES "app_schema"."app_team"("team_uuid") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
