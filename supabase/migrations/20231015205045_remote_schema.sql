
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE TYPE "public"."class_year" AS ENUM (
    'middle_school',
    'high_school',
    'freshman',
    'sophmore',
    'junior',
    'senior',
    'graduate',
    'post_graduate'
);

ALTER TYPE "public"."class_year" OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."app_user_profile" (
    "user_uuid" "uuid" NOT NULL,
    "user_email_address" "text" NOT NULL,
    "user_avatar_url" "text",
    "user_onboarding_complete" boolean,
    "user_display_name" "text" NOT NULL,
    "user_class_year" "public"."class_year" NOT NULL
);

ALTER TABLE "public"."app_user_profile" OWNER TO "postgres";

ALTER TABLE ONLY "public"."app_user_profile"
    ADD CONSTRAINT "app_user_profile_pkey" PRIMARY KEY ("user_uuid");

ALTER TABLE ONLY "public"."app_user_profile"
    ADD CONSTRAINT "app_user_profile_user_display_name_unique" UNIQUE ("user_display_name");

ALTER TABLE ONLY "public"."app_user_profile"
    ADD CONSTRAINT "app_user_profile_user_email_address_unique" UNIQUE ("user_email_address");

CREATE INDEX "user_uuid_index" ON "public"."app_user_profile" USING "btree" ("user_uuid");

CREATE POLICY "User Profile is viewable only by authenticated users" ON "public"."app_user_profile" FOR SELECT TO "authenticated" USING (true);

ALTER TABLE "public"."app_user_profile" ENABLE ROW LEVEL SECURITY;

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON TABLE "public"."app_user_profile" TO "anon";
GRANT ALL ON TABLE "public"."app_user_profile" TO "authenticated";
GRANT ALL ON TABLE "public"."app_user_profile" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
