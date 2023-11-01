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
import { userRouter } from "./server/routers/user";
import { db } from "./db/drizzle";
import { TRPCError } from "@trpc/server";

export async function middleware(req: NextRequest) {
  try {
    const res = NextResponse.next();
    const supabase = composeMiddlewareClient(req, res);
    const session = await getSession(supabase);

    // Create Server-Side Caller `User` to access Procedures
    const userRPC = userRouter.createCaller({
      db,
      req,
      supabase,
      headers: req.headers,
      session: session,
    });

    // If the user has not completed onboarding, then
    // redirect the user to the onboarding forms.
    const { is_onboarding_complete } = await userRPC.is_onboarding_complete({
      user_uuid: session.user.id,
    });

    if (
      !is_onboarding_complete &&
      !req.nextUrl.pathname.startsWith(siteConfig.paths.onboarding)
    ) {
      return redirectToPath(req, siteConfig.paths.onboarding);
    }

    return res;
  } catch (cause) {
    // Ignore Errors Coming From Sign-In to prevent Infinite Redirect
    if (req.nextUrl.pathname.startsWith(siteConfig.paths.sign_in)) return;

    // If a user does not have a valid session or encounters
    // an error when retrieving a valid session, redirect to sign in.
    if (cause instanceof BaseError) {
      return redirectToSignInWithError(req, cause);
    }

    if (cause instanceof TRPCError) {
      const trpc_error = new BaseError({
        error_title: cause.code,
        error_desc: cause.message,
      });

      return redirectToSignInWithError(req, trpc_error);
    }

    const unknown_error = new BaseError({
      error_title: "Unknown Error",
      error_desc: null,
    });

    return redirectToSignInWithError(req, unknown_error);
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
