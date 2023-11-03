CREATE TABLE IF NOT EXISTS "app_schema"."app_onboarding_phase" (
	"phase_id" serial PRIMARY KEY NOT NULL,
	"phase_name" text NOT NULL,
	CONSTRAINT "app_onboarding_phase_phase_name_unique" UNIQUE("phase_name")
);
--> statement-breakpoint
ALTER TABLE "app_schema"."app_user_profile" ADD COLUMN "user_onboarding_phase" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_schema"."app_user_profile" ADD CONSTRAINT "app_user_profile_user_onboarding_phase_app_onboarding_phase_phase_name_fk" FOREIGN KEY ("user_onboarding_phase") REFERENCES "app_schema"."app_onboarding_phase"("phase_name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "app_schema"."app_onboarding_phase" ENABLE ROW LEVEL SECURITY;