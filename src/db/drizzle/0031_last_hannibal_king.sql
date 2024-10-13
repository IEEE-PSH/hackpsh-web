CREATE TABLE IF NOT EXISTS "app_schema"."app_solved_challenges" (
	"solved_challenge_uuid" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"solve_challenge_team_uuid" uuid
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_schema"."app_solved_challenges" ADD CONSTRAINT "app_solved_challenges_solve_challenge_team_uuid_app_team_team_uuid_fk" FOREIGN KEY ("solve_challenge_team_uuid") REFERENCES "app_schema"."app_team"("team_uuid") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;