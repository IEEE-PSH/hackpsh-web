ALTER TABLE "app_schema"."app_solved_challenges" RENAME COLUMN "solve_challenge_team_uuid" TO "solved_challenge_team_uuid";--> statement-breakpoint
ALTER TABLE "app_schema"."app_solved_challenges" DROP CONSTRAINT "app_solved_challenges_solve_challenge_team_uuid_app_team_team_uuid_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_schema"."app_solved_challenges" ADD CONSTRAINT "app_solved_challenges_solved_challenge_uuid_app_challenges_challenge_uuid_fk" FOREIGN KEY ("solved_challenge_uuid") REFERENCES "app_schema"."app_challenges"("challenge_uuid") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_schema"."app_solved_challenges" ADD CONSTRAINT "app_solved_challenges_solved_challenge_team_uuid_app_team_team_uuid_fk" FOREIGN KEY ("solved_challenge_team_uuid") REFERENCES "app_schema"."app_team"("team_uuid") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
