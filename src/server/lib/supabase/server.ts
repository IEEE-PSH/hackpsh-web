import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { type SupabaseClient } from "@supabase/supabase-js";
import { BaseError } from "@/shared/error";

export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
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

export async function getSession(supabase: SupabaseClient) {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      throw new BaseError({
        error_title: error.name,
        error_desc: error.message,
      });
    }

    if (!session) {
      throw new Error();
    }

    return session;
  } catch (error) {
    throw new BaseError({
      error_title: "Authentication Error",
      error_desc: "Session was unable to be acquired or is invalid.",
    });
  }
}
