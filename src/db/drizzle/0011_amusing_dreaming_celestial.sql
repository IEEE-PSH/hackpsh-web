CREATE TABLE IF NOT EXISTS "app_schema"."app_major" (
	"major_id" serial PRIMARY KEY NOT NULL,
	"major_name" text NOT NULL,
	CONSTRAINT "app_major_major_name_unique" UNIQUE("major_name")
);
--> statement-breakpoint
ALTER TABLE "app_schema"."app_user_profile" ADD COLUMN "user_major" text;--> statement-breakpoint
ALTER TABLE "app_schema"."app_user_profile" ADD COLUMN "user_support_administrative" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "app_schema"."app_user_profile" ADD COLUMN "user_support_technical" boolean DEFAULT false;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_schema"."app_user_profile" ADD CONSTRAINT "app_user_profile_user_major_app_major_major_name_fk" FOREIGN KEY ("user_major") REFERENCES "app_schema"."app_major"("major_name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
