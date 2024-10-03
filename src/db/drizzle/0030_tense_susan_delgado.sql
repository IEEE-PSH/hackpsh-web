CREATE TABLE IF NOT EXISTS "app_schema"."app_test_cases" (
	"test_case_uuid" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"test_case_input" text NOT NULL,
	"test_case_output" text NOT NULL,
	"test_case_challenge_uuid" uuid
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_schema"."app_test_cases" ADD CONSTRAINT "app_test_cases_test_case_challenge_uuid_app_challenges_challenge_uuid_fk" FOREIGN KEY ("test_case_challenge_uuid") REFERENCES "app_schema"."app_challenges"("challenge_uuid") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "app_schema"."app_challenges" DROP COLUMN IF EXISTS "challenge_testcase_input_1";--> statement-breakpoint
ALTER TABLE "app_schema"."app_challenges" DROP COLUMN IF EXISTS "challenge_testcase_output_1";--> statement-breakpoint
ALTER TABLE "app_schema"."app_challenges" DROP COLUMN IF EXISTS "challenge_testcase_input_2";--> statement-breakpoint
ALTER TABLE "app_schema"."app_challenges" DROP COLUMN IF EXISTS "challenge_testcase_output_2";

ALTER TABLE "app_schema"."app_test_cases" ENABLE ROW LEVEL SECURITY;