ALTER TABLE "app_schema"."app_challenges" ALTER COLUMN "challenge_difficulty" DROP NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_schema"."app_challenges" ADD CONSTRAINT "app_challenges_challenge_difficulty_app_difficulty_difficulty_name_fk" FOREIGN KEY ("challenge_difficulty") REFERENCES "app_schema"."app_difficulty"("difficulty_name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
