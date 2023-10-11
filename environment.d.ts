namespace NodeJS {
  interface ProcessEnv {

    /**
     * Sign In URL
     * Specifies where the sign-in page / route exists
     * @type {string}
     */
    NEXT_PUBLIC_SIGN_IN_PATH: string
    
    NEXT_PUBLIC_SUPABASE_URL: string

    NEXT_PUBLIC_SUPABASE_ANON_KEY: string

    DATABASE_URL: string
  }
}
