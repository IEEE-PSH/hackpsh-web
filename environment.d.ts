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
    DATABASE_URL: string

    /**
     * The domain name of the generated deployment URL. Example: `*.vercel.app`. 
     * The value **does not** include the protocol scheme `https://`.
     * 
     * Do not set this variable in local development.
     * @type {string}
     */
    VERCEL_URL: string

    /**
     * Sign In Route Path
     * Specifies where the sign-in page / route exists
     * @type {string}
     */
    NEXT_PUBLIC_SIGN_IN_PATH: string

   /**
     * Sign Up Route Path
     * Specifies where the sign-up page / route exists
     * @type {string}
     */
    NEXT_PUBLIC_SIGN_UP_PATH: string

   /**
     * Dashboard Route Path
     * Specifies where the dashboard page / route exists
     * @type {string}
     */
    NEXT_PUBLIC_DASHBOARD_PATH: string

   /**
     * Onboarding Route Path
     * Specifies where the onboarding page / route exists
     * @type {string}
     */
   NEXT_PUBLIC_ONBOARDING_PATH: string
  }
}
