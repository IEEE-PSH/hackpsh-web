import { siteConfig } from "@/app/_config/site";
import {
  retrieveCallbackToken,
  validateErrorURLParams,
} from "@/app/_lib/auth/server";
import {
  BaseError,
  redirectToPath,
  redirectToSignInWithError,
} from "@/app/_lib/server-utils";
import {
  composeRouteHandlerClient,
  exchangeCallbackTokenForSession,
} from "@/app/_lib/supabase/server";
import { db } from "@/db/drizzle";
import { userRouter } from "@/server/routers/user";
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
  try {
    const requestURL = new URL(req.url);

    // Sanitize Incoming Request against URL Error Parameters
    validateErrorURLParams(requestURL);

    // Start Session Acquisition Process
    const callbackToken = retrieveCallbackToken(requestURL);
    const supabase = composeRouteHandlerClient();
    const session = await exchangeCallbackTokenForSession(
      supabase,
      callbackToken,
    );

    // Create Server-Side Caller `User` to access Procedures
    const userRPC = userRouter.createCaller({
      db,
      req,
      supabase,
      headers: req.headers,
      session: session,
    });

    // EnsureUserExists
    const { does_user_exist } = await userRPC.does_user_exist({
      user_uuid: session.user.id,
    });

    if (!does_user_exist) {
      await userRPC.create_user({
        user_uuid: session.user.id,
        user_email_address: session.user.email!,
      });
    }

    const { is_onboarding_complete } = await userRPC.is_onboarding_complete({
      user_uuid: session.user.id,
    });

    if (is_onboarding_complete) {
      return redirectToPath(req, siteConfig.paths.dashboard);
    } else {
      return redirectToPath(req, siteConfig.paths.onboarding);
    }
  } catch (cause) {
    if (cause instanceof BaseError) {
      return redirectToSignInWithError(req, cause);
    }

    const unknown_error = new BaseError({
      error_title: "Unknown Error",
      error_desc: null,
    });

    return redirectToSignInWithError(req, unknown_error);
  }
}
