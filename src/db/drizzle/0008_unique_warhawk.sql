ALTER TABLE "app_schema"."app_announcement" ALTER COLUMN "announcement_created_at" SET NOT NULL;

ALTER TABLE "app_schema"."app_announcement" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "app_schema"."app_role" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "app_schema"."app_school_year" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "app_schema"."app_team" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "app_schema"."app_user_profile" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "drizzle"."__drizzle_migrations" ENABLE ROW LEVEL SECURITY;