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

  if (error && !req.nextUrl.pathname.startsWith(siteConfig.paths.sign_in)) {
    return redirectToSignInWithError(
      req,
      "auth_error",
      "Session was not able to be acquired.",
    );
  }

  // If a user has a valid session and navigates to sign-in page,
  // then automatically redirect them to dashboard (only if their onboarding is complete).
  if (
    session &&
    !req.nextUrl.pathname.startsWith(siteConfig.paths.onboarding)
  ) {
    const { is_onboarding_complete } =
      await serverTRPC.user.is_onboarding_complete.query({
        user_uuid: session.user.id,
      });

    if (is_onboarding_complete) {
      return redirectToPath(req, siteConfig.paths.dashboard);
    } else {
      return redirectToPath(req, siteConfig.paths.onboarding);
    }
  }
}

export const config = {
  matcher: ["/sign-in", "/dashboard", "/onboarding"],
};
