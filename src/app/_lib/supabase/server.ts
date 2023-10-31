import {
  SupabaseClient,
  createRouteHandlerClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { BaseError } from "../server-utils";

export function composeRouteHandlerClient() {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  return supabase;
}

export async function exchangeCallbackTokenForSession(
  supabase: SupabaseClient,
  callbackToken: string,
) {
  const {
    data: { session },
    error,
  } = await supabase.auth.exchangeCodeForSession(callbackToken);

  if (error) {
    throw new BaseError({
      error_title: error.name,
      error_desc: error.message,
    });
  }

  if (!session) {
    throw new BaseError({
      error_title: "Authentication Error",
      error_desc: "Session was unable to be acquired.",
    });
  }

  return session;
}
