CREATE TABLE IF NOT EXISTS "app_schema"."app_event" (
	"event_date" text PRIMARY KEY DEFAULT 'aaaa-aaa-aa' NOT NULL,
	"start_start_time" integer DEFAULT 0 NOT NULL,
	"event_end_time" integer DEFAULT 0 NOT NULL
);
