import { NextRequest, NextResponse } from "next/server";

export function redirectToPath(req: NextRequest, path: string) {
  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = path;
  return NextResponse.redirect(redirectUrl);
}