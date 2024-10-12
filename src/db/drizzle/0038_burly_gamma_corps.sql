ALTER TABLE "app_schema"."app_solved_challenges" DROP CONSTRAINT "app_solved_challenges_solved_challenge_uuid_app_challenges_challenge_uuid_fk";
--> statement-breakpoint
ALTER TABLE "app_schema"."app_solved_challenges" ADD COLUMN "solved_challenge_foreign_uuid" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_schema"."app_solved_challenges" ADD CONSTRAINT "app_solved_challenges_solved_challenge_foreign_uuid_app_challenges_challenge_uuid_fk" FOREIGN KEY ("solved_challenge_foreign_uuid") REFERENCES "app_schema"."app_challenges"("challenge_uuid") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
