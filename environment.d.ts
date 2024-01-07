/* eslint-disable @typescript-eslint/no-unused-vars */
namespace NodeJS {
  interface ProcessEnv {
    /**
     * We utilize Drizzle ORM for this project for type-safety and SQL Migrations
     * and to access the DB.
     *
     * See More Info Here:
     * https://orm.drizzle.team/docs/overview
     *
     * Connection string to Supabase's Postgres SQL DB
     * Connection Pool Mode (Transaction) | pgBouncer
     *
     * See Docs for more about accessing the DB:
     * https://supabase.com/docs/guides/database/connecting-to-postgres#serverless-apis
     *
     * @type {string}
     */
    DATABASE_URL: string;

    /**
     * The domain name of the generated deployment URL. Example: `*.vercel.app`.
     * The value **does not** include the protocol scheme `https://`.
     *
     * Do not set this variable in local development.
     * @type {string}
     */
    VERCEL_URL: string;

    /**
     * JWT (JSON Web Token) used to interact with the database if the user is not logged
     * in (anonymous). This key is meant to have limited privilegeswhich can be defined
     * using RLS (Row Level Security) policies.
     *
     * See Docs for more about RLS policies:
     * https://supabase.com/docs/guides/auth/row-level-security
     * @type {string}
     */
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;

    /**
     * URL for Supabase API.
     *
     * @type {string}
     */
    NEXT_PUBLIC_SUPABASE_URL: string;

    /**
     * Credentials used to allow access to Google OAuth services.
     * @type {string}
     */
    SUPABASE_AUTH_EXTERNAL_GOOGLE_OAUTH_CLIENT_ID: string;
    SUPABASE_AUTH_EXTERNAL_GOOGLE_SECRET: string;
  }
}
