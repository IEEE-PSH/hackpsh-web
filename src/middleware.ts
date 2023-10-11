import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If a user is not signed-in, redirect to sign-in page.
  if (!session) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = process.env.NEXT_PUBLIC_SIGN_IN_PATH;

    return NextResponse.redirect(redirectUrl);
  }
}

export const config = {
  matcher: ['/dashboard'],
}