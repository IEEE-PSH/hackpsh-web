CREATE TABLE IF NOT EXISTS "app_schema"."app_role" (
	"role_id" serial PRIMARY KEY NOT NULL,
	"role_name" text NOT NULL,
	CONSTRAINT "app_role_role_name_unique" UNIQUE("role_name")
);
--> statement-breakpoint
ALTER TABLE "app_schema"."app_user_profile" ADD COLUMN "user_role" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_schema"."app_user_profile" ADD CONSTRAINT "app_user_profile_user_role_app_role_role_name_fk" FOREIGN KEY ("user_role") REFERENCES "app_schema"."app_role"("role_name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
