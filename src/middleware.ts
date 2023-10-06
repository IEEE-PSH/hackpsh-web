import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { RedirectType, redirect } from "next/navigation";
import { NextResponse } from "next/server";


// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
  afterAuth(auth, req, evt) {
    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    // redirect authenticated users who have not completed onboarding to /onboarding
    if (auth.userId && !auth.sessionClaims?.onboardingComplete && !req.nextUrl.pathname.startsWith('/onboarding')) {
      const onboarding = new URL('/onboarding', req.url);
      return NextResponse.redirect(onboarding);
    }
  },
  publicRoutes: ["/"],
  debug: false
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
