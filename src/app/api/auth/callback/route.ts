import { siteConfig } from "@/app/_config/site";
import {
  redirectToPath,
  redirectToSignInWithError,
} from "@/app/_lib/server-utils";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { type NextRequest } from "next/server";

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
export async function GET(req: NextRequest) {
  const requestUrl = new URL(req.url);
  const code = requestUrl.searchParams.get("code");

  const error_reason = requestUrl.searchParams.get("error");
  const error_description = requestUrl.searchParams.get("error_description");

  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const { data } = await supabase.auth.exchangeCodeForSession(code);

    if (data.session == null) {
      return redirectToSignInWithError(
        req,
        "invalid_session",
        "Session was not able to be acquired.",
      );
    }

    // TODO: Create Logic from session to query against db in order to redirect to onboarding or dashboard appropriately
    // This is the only entry point to our application
    return redirectToPath(req, siteConfig.paths.dashboard);
  }

  // If the exchange for a valid session generates an error, supabase hits our callback route with
  // the following: `?error=unauthorized_client&error_code=401&error_description=Email+link+is+invalid+or+has+expired`
  if (error_reason) {
    return redirectToSignInWithError(req, error_reason, error_description!);
  }
}
