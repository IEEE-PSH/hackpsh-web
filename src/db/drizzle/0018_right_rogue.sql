ALTER TABLE "app_schema"."app_event" RENAME COLUMN "start_start_time" TO "event_start_time";--> statement-breakpoint
ALTER TABLE "app_schema"."app_event" ALTER COLUMN "event_date" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "app_schema"."app_event" ALTER COLUMN "event_start_time" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "app_schema"."app_event" ALTER COLUMN "event_start_time" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "app_schema"."app_event" ALTER COLUMN "event_end_time" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "app_schema"."app_event" ALTER COLUMN "event_end_time" DROP DEFAULT;

ALTER TABLE "app_schema"."app_event" ENABLE ROW LEVEL SECURITY;