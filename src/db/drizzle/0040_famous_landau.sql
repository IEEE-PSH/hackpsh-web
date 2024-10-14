ALTER TABLE "app_schema"."app_event" ALTER COLUMN "event_challenges_enabled" SET NOT NULL;


ALTER TABLE "app_schema"."app_event" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON "app_schema"."app_event" AS PERMISSIVE FOR SELECT TO authenticated USING (true);
ALTER publication supabase_realtime ADD TABLE "app_schema"."app_event";

ALTER TABLE "app_schema"."app_solved_challenges" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON "app_schema"."app_event" AS PERMISSIVE FOR SELECT TO authenticated USING (true);
ALTER publication supabase_realtime ADD TABLE "app_schema"."app_solved_challenges";
