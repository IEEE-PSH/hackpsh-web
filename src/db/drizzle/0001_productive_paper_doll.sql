ALTER TABLE "app_schema"."app_event" ALTER COLUMN "event_challenges_enabled" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "app_schema"."app_user_profile" ALTER COLUMN "user_onboarding_complete" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "app_schema"."app_user_profile" ALTER COLUMN "user_onboarding_complete" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "app_schema"."app_user_profile" ALTER COLUMN "user_support_administrative" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "app_schema"."app_user_profile" ALTER COLUMN "user_support_technical" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "app_schema"."app_user_profile" ALTER COLUMN "user_team_leader" SET NOT NULL;