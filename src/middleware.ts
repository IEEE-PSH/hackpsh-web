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

    const { get_user_onboarding_phase } =
      await serverTRPC.user.get_user_onboarding_phase.query({
        user_uuid: session.user.id,
      });

    //handle onboarding phases individually
    if (
      get_user_onboarding_phase === "personal-details" &&
      !req.nextUrl.pathname.startsWith(
        siteConfig.paths.onboarding_personal_details,
      )
    ) {
      return redirectToPath(req, siteConfig.paths.onboarding_personal_details);
    } else if (
      get_user_onboarding_phase === "school-details" &&
      !req.nextUrl.pathname.startsWith(
        siteConfig.paths.onboarding_school_details,
      )
    ) {
      return redirectToPath(req, siteConfig.paths.onboarding_school_details);
    } else if (
      get_user_onboarding_phase === "support-us" &&
      !req.nextUrl.pathname.startsWith(siteConfig.paths.onboarding_support_us)
    ) {
      return redirectToPath(req, siteConfig.paths.onboarding_support_us);
    }

    //prevent users who completed onboarding from revisiting onboarding forms
    if (
      is_onboarding_complete &&
      req.nextUrl.pathname.startsWith(siteConfig.paths.onboarding)
    ) {
      return redirectToPath(req, siteConfig.paths.dashboard);
    }

    if (
      !is_onboarding_complete &&
      !req.nextUrl.pathname.startsWith(siteConfig.paths.onboarding)
    ) {
      return redirectToPath(req, siteConfig.paths.onboarding);
    }

    //prevent participants from accessing admin/officer-only pages
    if (
      get_user_role === "participant" &&
      (req.nextUrl.pathname.startsWith(siteConfig.paths.users) ||
        req.nextUrl.pathname.startsWith(siteConfig.paths.event))
    ) {
      return redirectToPath(req, siteConfig.paths.account);
    }

    if (
      get_user_role === "participant" &&
      (req.nextUrl.pathname.startsWith(siteConfig.paths.create_post) ||
        req.nextUrl.pathname.startsWith(siteConfig.paths.edit_post))
    ) {
      return redirectToPath(req, siteConfig.paths.announcements);
    }

    //prevent participants from viewing challenges while challenges disabled
    const is_challenges_enabled =
      await serverTRPC.event.is_challenges_enabled.query();
    if (
      get_user_role === "participant" &&
      req.nextUrl.pathname.startsWith(siteConfig.paths.challenge) &&
      !is_challenges_enabled
    ) {
      return redirectToPath(req, siteConfig.paths.dashboard);
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
    "/onboarding/(.*)",
    "/announcements(.*)",
    "/leaderboard",
    "/settings(.*)",
    "/challenge(.*)",
    "/teams(.*)",
  ],
};
