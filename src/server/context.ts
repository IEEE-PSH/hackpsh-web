import { db } from "@/db/drizzle";
import { type NextRequest } from "next/server";
import {
  createRouteHandlerClient,
  type SupabaseClient,
  type Session,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 */

interface CreateContextOptions {
  req: NextRequest;
  headers: Headers;
  session: Session | null;
  supabase: SupabaseClient;
}

/**
 * This helper generates the "internals" for a tRPC context. If you need to use it, you can export
 * it from here.
 *
 * Examples of things you may need it for:
 * - testing, so we don't have to mock Next.js' req/res
 * - tRPC's `createSSGHelpers`, where we don't have req/res
 *
 * @see https://create.t3.gg/en/usage/trpc#-serverapitrpcts
 */
export const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    req: opts.req,
    headers: opts.headers,
    session: opts.session,
    supabase: opts.supabase,
    db,
  };
};

/**
 * This is the actual context you will use in your router. It will be used to process every request
 * that goes through your tRPC endpoint.
 *
 * @see https://trpc.io/docs/context
 */
export const createTRPCContext = async (opts: { req: NextRequest }) => {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  // Fetch stuff that depends on the request
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return createInnerTRPCContext({
    req: opts.req,
    headers: opts.req.headers,
    session,
    supabase,
  });
};
