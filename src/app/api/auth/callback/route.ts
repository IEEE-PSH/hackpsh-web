import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

/**
 * This route handles users who use magic link sign-in (email),
 * who have to exchange their callback token, in order to receive
 * a valid session.
 *
 * It follows the PKCE Auth Flow, see link below for more information:
 * https://supabase.com/docs/guides/auth/auth-helpers/nextjs#migrating-to-v07x
 *
 * @param request
 * @returns New User Session through Cookies
 */
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  const error_reason = requestUrl.searchParams.get("error");
  const error_description = requestUrl.searchParams.get("error_description");

  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const { data } = await supabase.auth.exchangeCodeForSession(code);

    if (data.session == null) {
      const redirectURLErrorParams = new URL(
        `${process.env.NEXT_PUBLIC_SIGN_IN_PATH}`,
        request.url,
      );
      redirectURLErrorParams.searchParams.append("error", "invalid_session");
      redirectURLErrorParams.searchParams.append(
        "error_description",
        "Session was not able to be acquired",
      );

      return NextResponse.redirect(redirectURLErrorParams);
    }

    // TODO: Create Logic from session to query against db in order to redirect to onboarding or dashboard appropriately
    // This is the only entry point to our application
    return NextResponse.redirect(
      new URL(process.env.NEXT_PUBLIC_DASHBOARD_PATH, request.url),
    );
  }

  // If the exchange for a valid session generates an error, supabase hits our callback route with
  // the following: `?error=unauthorized_client&error_code=401&error_description=Email+link+is+invalid+or+has+expired`
  if (error_reason) {
    const redirectURLErrorParams = new URL(
      `${process.env.NEXT_PUBLIC_SIGN_IN_PATH}`,
      request.url,
    );
    redirectURLErrorParams.searchParams.append("error", error_reason);
    redirectURLErrorParams.searchParams.append(
      "error_description",
      error_description!,
    );

    return NextResponse.redirect(redirectURLErrorParams);
  }
}
