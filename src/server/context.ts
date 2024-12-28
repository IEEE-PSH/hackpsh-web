import { type SupabaseClient } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";
import { db } from "@/db/drizzle";
import { type Session } from "@supabase/supabase-js";
import { createClient } from "./lib/supabase/server";

/**
 * This defines the core options needed to create the context for your tRPC routes.
 */
interface CreateContextOptions {
  req: NextRequest;
  headers: Headers;
  session: Session | null;
  supabase: SupabaseClient;
}

/**
 * This helper generates the "internals" for a tRPC context.
 */
export const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    req: opts.req,
    headers: opts.headers,
    session: opts.session,
    supabase: opts.supabase,
    db, // Pass the Drizzle ORM instance
  };
};

/**
 * This creates the tRPC context for each request.
 */
export const createTRPCContext = async (opts: { req: NextRequest }) => {
  // Create the Supabase client manually
  // const supabase = createClient(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL,
  //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  // );
  const supabase = createClient();

  // Fetch the session using the cookie
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Pass everything to the inner context
  return createInnerTRPCContext({
    req: opts.req,
    headers: opts.req.headers,
    session,
    supabase,
  });
};
