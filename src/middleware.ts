import { type NextRequest, NextResponse } from "next/server";
import {
  BaseError,
  redirectToPath,
  redirectToSignInWithError,
} from "@/app/_lib/server-utils";
import { siteConfig } from "./app/_config/site";
import {
  composeMiddlewareClient,
  getSession,
} from "./app/_lib/supabase/server";

export async function middleware(req: NextRequest) {
  try {
    const res = NextResponse.next();
    const supabase = composeMiddlewareClient(req, res);
    const session = await getSession(supabase);

    return res;
  } catch (cause) {
    // If a user does not have a valid session or encounters
    // an error when retrieving a valid session, redirect to sign in.
    if (
      cause instanceof BaseError &&
      req.nextUrl.pathname.startsWith(siteConfig.paths.sign_in)
    ) {
      return redirectToSignInWithError(req, cause);
    }
  }

  // // If a user has a valid session and lands on sign-in page,
  // // then redirect them onto the platform.
  // if (session) {
  //   // Check if they exist in the database first, otherwise create a basic user record.
  //   const { does_user_exist } = await serverTRPC.user.does_user_exist.query({
  //     user_uuid: session.user.id,
  //   });

  //   const { is_onboarding_complete } =
  //     await serverTRPC.user.is_onboarding_complete.query({
  //       user_uuid: session.user.id,
  //     });

  //   // If a user's onboarding is not complete, and they already are not on onboarding,
  //   // then redirect them back onto onboarding.
  //   if (
  //     !is_onboarding_complete &&
  //     !req.nextUrl.pathname.startsWith(siteConfig.paths.onboarding)
  //   ) {
  //     return redirectToPath(req, siteConfig.paths.onboarding);
  //   }
  // }
}

export const config = {
  matcher: [
    "/sign-in",
    "/dashboard",
    "/onboarding",
    "/announcements",
    "/leaderboard",
    "/challenges",
  ],
};
