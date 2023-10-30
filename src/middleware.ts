import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { type NextRequest, NextResponse } from "next/server";
import {
  redirectToPath,
  redirectToSignInWithError,
} from "@/app/_lib/server-utils";
import { siteConfig } from "./app/_config/site";
import { serverTRPC } from "./app/_trpc/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  // If a user does not have a valid session or encounters
  // an error when retrieving a valid session, redirect to sign in.
  if (!session && !req.nextUrl.pathname.startsWith(siteConfig.paths.sign_in)) {
    return redirectToSignInWithError(
      req,
      "session_timeout",
      "Session has timed out. Please login again.",
    );
  }

  // If an errors in the session acquisition process from supabase,
  // then redirect to sign in
  if (error && !req.nextUrl.pathname.startsWith(siteConfig.paths.sign_in)) {
    return redirectToSignInWithError(
      req,
      "auth_error",
      "Session was not able to be acquired.",
    );
  }

  // If a user has a valid session and lands on sign-in page,
  // then redirect them onto the platform.
  if (session) {
    // Check if they exist in the database first, otherwise create a basic user record.
    const { does_user_exist } = await serverTRPC.user.does_user_exist.query({
      user_uuid: session.user.id,
    });

    if (!does_user_exist) {
      const result = await serverTRPC.user.create_user.mutate({
        user_uuid: session.user.id,
        user_email_address: session.user.email!,
      });

      if (!result) {
        return redirectToSignInWithError(
          req,
          "user_creation",
          "Unable to create brand new user.",
        );
      }
    }

    const { is_onboarding_complete } =
      await serverTRPC.user.is_onboarding_complete.query({
        user_uuid: session.user.id,
      });

    // If a user's onboarding is not complete, and they already are not on onboarding,
    // then redirect them back onto onboarding.
    if (
      !is_onboarding_complete &&
      !req.nextUrl.pathname.startsWith(siteConfig.paths.onboarding)
    ) {
      return redirectToPath(req, siteConfig.paths.onboarding);
    }
  }
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
