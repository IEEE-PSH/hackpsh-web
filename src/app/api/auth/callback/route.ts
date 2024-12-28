import { siteConfig } from "@/app/_config/site";
import { db } from "@/db/drizzle";
import { type NextRequest } from "next/server";
import { userRouter } from "@/server/routers/user";
import { redirectToPath } from "@/server/lib/server-utils";
import {
  validateErrorURLParams,
  retrieveCallbackToken,
} from "@/server/lib/auth/server";
import handleError from "@/server/lib/server/handleError";
import {
  createClient,
  exchangeCallbackTokenForSession,
} from "@/server/lib/supabase/server";

/**
 * THIS IS DEPRECATED. CHANGE NOTES
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
  const supabase = createClient();

  try {
    const requestURL = new URL(req.url);

    // Sanitize Incoming Request against URL Error Parameters
    validateErrorURLParams(requestURL);

    // Start Session Acquisition Process
    const callbackToken = retrieveCallbackToken(requestURL);
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

    // On Sign-Up / Sign-In, Verify if the user's
    // data exists within DB, otherwise create a base user
    // record within the DB,
    const { does_user_exist } = await userRPC.does_user_exist({
      user_uuid: session.user.id,
    });

    if (!does_user_exist) {
      await userRPC.create_user({
        user_uuid: session.user.id,
        user_email_address: session.user.email!,
      });
    }

    // If the user has not completed onboarding, then
    // redirect the user to the onboarding forms.
    const { is_onboarding_complete } = await userRPC.is_onboarding_complete({
      user_uuid: session.user.id,
    });

    if (is_onboarding_complete) {
      return redirectToPath(req, siteConfig.paths.dashboard);
    } else {
      return redirectToPath(req, siteConfig.paths.onboarding);
    }
  } catch (cause) {
    return handleError(req, cause);
  }
}
