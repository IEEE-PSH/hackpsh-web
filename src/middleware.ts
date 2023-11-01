import { type NextRequest, NextResponse } from "next/server";
import { redirectToPath } from "@/app/_lib/server-utils";
import { siteConfig } from "./app/_config/site";
import {
  composeMiddlewareClient,
  getSession,
} from "./app/_lib/supabase/server";
import handleError from "./app/_lib/server/handleError";
import { serverTRPC } from "./app/_trpc/server";

export async function middleware(req: NextRequest) {
  try {
    const res = NextResponse.next();
    const supabase = composeMiddlewareClient(req, res);
    const session = await getSession(supabase);

    // If the user has not completed onboarding, then
    // redirect the user to the onboarding forms.

    // Forced to use serverTRPC in middleware due to
    // Next.js Middleware forced on Edge Runtime,
    // which doesn't support the net module
    // (dep of node-postgres / drizzle) when
    // using server-side callers (like /api/auth/callback)
    const { is_onboarding_complete } =
      await serverTRPC.user.is_onboarding_complete.query({
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
    return handleError(req, cause);
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
