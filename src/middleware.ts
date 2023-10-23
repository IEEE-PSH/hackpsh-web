import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { redirectToPath } from "@/app/_lib/server-utils";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If a user is not signed-in, redirect to sign-in page.
  if (!session) {
    return redirectToPath(req, process.env.NEXT_PUBLIC_SIGN_IN_PATH);
  }

  // TODO: Add Check above for onboarding complete
  // TODO: If Valid Session, but no onboarding complete -> redirectToPath(req, /onboarding)
}

export const config = {
  matcher: ["/dashboard", "/onboarding"],
};
