import { type NextRequest, NextResponse } from "next/server";
import { redirectToPath } from "@/server/lib/server-utils";
import { siteConfig } from "@/app/_config/site";
import { serverTRPC } from "@/app/_trpc/server";
import handleError from "@/server/lib/server/handleError";
import {
  composeMiddlewareClient,
  getSession,
} from "@/server/lib/supabase/server";

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

    const { get_user_role } = await serverTRPC.user.get_user_role.query({
      user_uuid: session.user.id,
    });

    if (
      !is_onboarding_complete &&
      !req.nextUrl.pathname.startsWith(siteConfig.paths.onboarding)
    ) {
      return redirectToPath(req, siteConfig.paths.onboarding);
    }

    if (
      get_user_role !== "admin" &&
      req.nextUrl.pathname.startsWith(siteConfig.paths.create_post)
    ) {
      return redirectToPath(req, siteConfig.paths.announcements);
    }
    // TODO: Create external functions for handling protected pages & role-based pages

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
    "/announcements/create-post",
    "/leaderboard",
    "/challenges",
  ],
};
