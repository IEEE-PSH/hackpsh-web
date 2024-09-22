ALTER TABLE "app_schema"."app_event" ALTER COLUMN "event_start_hour" SET DEFAULT 10;--> statement-breakpoint
ALTER TABLE "app_schema"."app_event" ALTER COLUMN "event_start_hour" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "app_schema"."app_event" ALTER COLUMN "event_duration" SET DEFAULT 12;--> statement-breakpoint
ALTER TABLE "app_schema"."app_event" ALTER COLUMN "event_duration" SET NOT NULL;