CREATE TABLE IF NOT EXISTS "app_schema"."app_contact" (
	"contact_uuid" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"contact_created_at" timestamp DEFAULT now() NOT NULL,
	"contact_first_name" text NOT NULL,
	"contact_last_name" text NOT NULL,
	"contact_email" text NOT NULL,
	"contact_content" text NOT NULL
);
