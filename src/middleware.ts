import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const isSignInPage = req.nextUrl.pathname.startsWith(process.env.NEXT_PUBLIC_SIGN_IN_PATH);
  const isSignUpPage = req.nextUrl.pathname.startsWith(process.env.NEXT_PUBLIC_SIGN_UP_PATH);

  // If a user is not signed-in, redirect to sign-in page.
  if (!session && !isSignInPage && !isSignUpPage) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = process.env.NEXT_PUBLIC_SIGN_IN_PATH;

    return NextResponse.redirect(redirectUrl);
  }

  // If the user is already signed-in / has a valid session, redirect them automatically to dashboard
  if (session && (isSignInPage || isSignUpPage)) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = process.env.NEXT_PUBLIC_DASHBOARD_PATH;

    return NextResponse.redirect(redirectUrl);
  }

}

export const config = {
  matcher: ['/dashboard', '/onboarding', '/sign-in', '/sign-up'],
}