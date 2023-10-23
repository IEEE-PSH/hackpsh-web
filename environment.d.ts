/* eslint-disable @typescript-eslint/no-unused-vars */
namespace NodeJS {
  interface ProcessEnv {
    /**
     * Make sure to run `pnpm run introspect` to pull table schema and all types.
     *
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
     * Sign In Route Path
     * Specifies where the sign-in page / route exists
     * @type {string}
     */
    NEXT_PUBLIC_SIGN_IN_PATH: string;

    /**
     * Sign Up Route Path
     * Specifies where the sign-up page / route exists
     * @type {string}
     */
    NEXT_PUBLIC_SIGN_UP_PATH: string;

    /**
     * Dashboard Route Path
     * Specifies where the dashboard page / route exists
     * @type {string}
     */
    NEXT_PUBLIC_DASHBOARD_PATH: string;

    /**
     * Onboarding Route Path
     * Specifies where the onboarding page / route exists
     * @type {string}
     */
    NEXT_PUBLIC_ONBOARDING_PATH: string;

    /**
     * Leaderboard Route Path
     * Specifies where the leaderboard page / route exists
     * @type {string}
     */
    NEXT_PUBLIC_LEADERBOARD_PATH: string;

    /**
     * Home Route Path
     * Specifies where the main "/" home page / route exists
     * @type {string}
     */
    NEXT_PUBLIC_HOME_PATH: string;

    /**
     * Challenges Route Path
     * Specifies where the challenges page / route exists
     * @type {string}
     */
    NEXT_PUBLIC_CHALLENGES_PATH: string;

    /**
     * Announcements Route Path
     * Specifies where the announcements page / route exists
     * @type {string}
     */
    NEXT_PUBLIC_ANNOUNCEMENTS_PATH: string;

    /**
     * Social Media Instagram Link
     * @type {string}
     */
    NEXT_PUBLIC_SOCIAL_INSTAGRAM_LINK: string;
  }
}
