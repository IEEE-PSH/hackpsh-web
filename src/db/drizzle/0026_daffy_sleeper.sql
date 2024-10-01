CREATE TABLE IF NOT EXISTS "app_schema"."app_challenges" (
	"challenge_uuid" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"challenge_title" text NOT NULL,
	"challenge_difficulty" text NOT NULL,
	"challenge_description" text NOT NULL,
	"challenge_function_header" text NOT NULL,
	"challenge_example_input" text NOT NULL,
	"challenge_example_output" text NOT NULL,
	"challenge_explanation" text,
	"challenge_testcase_input_1" text NOT NULL,
	"challenge_testcase_output_1" text NOT NULL,
	"challenge_testcase_input_2" text NOT NULL,
	"challenge_testcase_output_2" text NOT NULL
);

ALTER TABLE "app_schema"."app_challenges" ENABLE ROW LEVEL SECURITY;