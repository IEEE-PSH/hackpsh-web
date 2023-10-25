import { type NextRequest, NextResponse } from "next/server";
import { siteConfig } from "../_config/site";

export function redirectToPath(req: NextRequest, path: string) {
  const redirectUrl = new URL(req.nextUrl.origin);
  redirectUrl.pathname = path;
  return NextResponse.redirect(redirectUrl);
}

export function redirectToSignInWithError(
  req: NextRequest,
  error_title: string,
  error_description: string,
) {
  const redirectURLErrorParams = new URL(siteConfig.paths.sign_in, req.url);

  redirectURLErrorParams.searchParams.append("error", error_title);
  redirectURLErrorParams.searchParams.append(
    "error_description",
    error_description,
  );

  return NextResponse.redirect(redirectURLErrorParams);
}
