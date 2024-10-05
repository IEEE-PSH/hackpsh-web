ALTER TABLE "app_schema"."app_challenges" ALTER COLUMN "challenge_difficulty" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "app_schema"."app_solved_challenges" ALTER COLUMN "solve_challenge_team_uuid" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "app_schema"."app_test_cases" ALTER COLUMN "test_case_challenge_uuid" SET NOT NULL;