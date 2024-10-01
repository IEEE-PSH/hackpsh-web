CREATE TABLE IF NOT EXISTS "app_schema"."app_difficulty" (
	"difficulty_id" serial PRIMARY KEY NOT NULL,
	"difficulty_name" text NOT NULL,
	CONSTRAINT "app_difficulty_difficulty_name_unique" UNIQUE("difficulty_name")
);

ALTER TABLE "app_schema"."app_difficulty" ENABLE ROW LEVEL SECURITY;