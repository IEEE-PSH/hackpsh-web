ALTER TABLE "app_schema"."app_announcement" RENAME COLUMN "announcement_author" TO "announcement_author_uuid";--> statement-breakpoint
ALTER TABLE "app_schema"."app_announcement" DROP CONSTRAINT "app_announcement_announcement_author_app_user_profile_user_uuid_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "app_schema"."app_announcement" ADD CONSTRAINT "app_announcement_announcement_author_uuid_app_user_profile_user_uuid_fk" FOREIGN KEY ("announcement_author_uuid") REFERENCES "app_schema"."app_user_profile"("user_uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
