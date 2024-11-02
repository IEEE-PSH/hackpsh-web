ALTER TABLE "app_schema"."app_team" DROP CONSTRAINT "app_team_team_code_unique";--> statement-breakpoint
ALTER TABLE "app_schema"."app_team" ADD COLUMN "team_leader" text NOT NULL;