import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { serverTRPC } from "./app/_trpc/server";
import { siteConfig } from "./app/_config/site";
import { redirectToPath } from "./server/lib/server-utils";
import handleError from "./server/lib/server/handleError";

export const onboardingPaths = {
  "personal-details": siteConfig.paths.onboarding_personal_details,
  "school-details": siteConfig.paths.onboarding_school_details,
  "support-us": siteConfig.paths.onboarding_support_us,
};

export async function middleware(request: NextRequest) {
  try {
    let supabaseResponse = NextResponse.next({
      request,
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              request.cookies.set(name, value),
            );
            supabaseResponse = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options),
            );
          },
        },
      },
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // if (!user && request.nextUrl.pathname !== siteConfig.paths.sign_up) {
    //   return redirectToPath(request, siteConfig.paths.sign_up);
    // }

    const {
      user_onboarding_complete,
      user_onboarding_phase,
      user_role,
      is_challenges_enabled,
    } = await serverTRPC.user.get_middleware_info.query({
      user_uuid: user!.id,
    });

    //handle onboarding phases individually

    const pathnameKey = user_onboarding_phase as keyof typeof onboardingPaths;

    if (
      onboardingPaths[pathnameKey] &&
      request.nextUrl.pathname !== onboardingPaths[pathnameKey]
    )
      return redirectToPath(request, onboardingPaths[pathnameKey]);

    //prevent users who completed onboarding from revisiting onboarding forms
    if (
      user_onboarding_complete &&
      request.nextUrl.pathname.startsWith(siteConfig.paths.onboarding)
    )
      return redirectToPath(request, siteConfig.paths.dashboard);

    if (
      !user_onboarding_complete &&
      !request.nextUrl.pathname.startsWith(siteConfig.paths.onboarding)
    )
      return redirectToPath(request, siteConfig.paths.onboarding);

    //prevent participants from accessing admin/officer-only pages
    if (user_role === "participant") {
      if (
        request.nextUrl.pathname === siteConfig.paths.users ||
        request.nextUrl.pathname === siteConfig.paths.event
      )
        return redirectToPath(request, siteConfig.paths.account);

      if (
        request.nextUrl.pathname === siteConfig.paths.create_post ||
        request.nextUrl.pathname === siteConfig.paths.edit_post
      )
        return redirectToPath(request, siteConfig.paths.announcements);

      //prevent participants from viewing challenges while challenges disabled
      if (
        request.nextUrl.pathname === siteConfig.paths.challenge &&
        !is_challenges_enabled
      )
        return redirectToPath(request, siteConfig.paths.dashboard);
    }

    return supabaseResponse;
  } catch (error) {
    return handleError(request, error);
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
