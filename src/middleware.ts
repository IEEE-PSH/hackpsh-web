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

    // Forced to use serverTRPC in middleware due to
    // Next.js Middleware forced on Edge Runtime,
    // which doesn't support the net module
    // (dep of node-postgres / drizzle) when
    // using server-side callers (like /api/auth/callback)
    
    const { user_onboarding_complete, user_onboarding_phase, user_role, is_challenges_enabled } =
      await serverTRPC.user.get_middleware_info.query({user_uuid:session.user.id})

    //handle onboarding phases individually
    const onboardingPaths = {
      "personal-details" : siteConfig.paths.onboarding_personal_details,
      "school-details" : siteConfig.paths.onboarding_school_details,
      "support-us" : siteConfig.paths.onboarding_support_us
    }
    const pathnameKey = user_onboarding_phase as keyof typeof onboardingPaths

    if(onboardingPaths[pathnameKey] && !req.nextUrl.pathname.startsWith(onboardingPaths[pathnameKey]))
      return redirectToPath(req, onboardingPaths[pathnameKey])
    

    //prevent users who completed onboarding from revisiting onboarding forms
    if (
      user_onboarding_complete &&
      req.nextUrl.pathname.startsWith(siteConfig.paths.onboarding)
    ) 
      return redirectToPath(req, siteConfig.paths.dashboard);
    
    if (
      !user_onboarding_complete &&
      !req.nextUrl.pathname.startsWith(siteConfig.paths.onboarding)
    ) 
      return redirectToPath(req, siteConfig.paths.onboarding);
    

    //prevent participants from accessing admin/officer-only pages
    if (user_role==="participant"){
      if (
        req.nextUrl.pathname.startsWith(siteConfig.paths.users) ||
          req.nextUrl.pathname.startsWith(siteConfig.paths.event)
      ) 
        return redirectToPath(req, siteConfig.paths.account);
      
  
      if (
        req.nextUrl.pathname.startsWith(siteConfig.paths.create_post) ||
          req.nextUrl.pathname.startsWith(siteConfig.paths.edit_post)
      ) 
        return redirectToPath(req, siteConfig.paths.announcements);
      
      //prevent participants from viewing challenges while challenges disabled
      if (
        req.nextUrl.pathname.startsWith(siteConfig.paths.challenge) &&
        !is_challenges_enabled
      )
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
