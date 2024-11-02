ALTER TABLE "app_schema"."app_team" RENAME COLUMN "team_leader" TO "team_leader_uuid";--> statement-breakpoint
ALTER TABLE "app_schema"."app_team" ALTER COLUMN "team_leader_uuid" SET DATA TYPE uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_schema"."app_team" ADD CONSTRAINT "app_team_team_leader_uuid_app_user_profile_user_uuid_fk" FOREIGN KEY ("team_leader_uuid") REFERENCES "app_schema"."app_user_profile"("user_uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
