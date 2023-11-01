import {
  SupabaseClient,
  createMiddlewareClient,
  createRouteHandlerClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { BaseError } from "../server-utils";
import { NextRequest, NextResponse } from "next/server";

export function composeRouteHandlerClient() {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  return supabase;
}

export function composeMiddlewareClient(req: NextRequest, res: NextResponse) {
  const supabase = createMiddlewareClient({ req, res });
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
      error_desc: "Session was unable to be acquired.",
    });
  }
}
