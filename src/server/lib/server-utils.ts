import { type NextRequest, NextResponse } from "next/server";
import { siteConfig } from "../../app/_config/site";
import { type BaseError } from "@/shared/error";

export function redirectToPath(req: NextRequest, path: string) {
  const redirectUrl = new URL(req.nextUrl.origin);
  redirectUrl.pathname = path;
  return NextResponse.redirect(redirectUrl);
}

export function redirectToSignInWithError(req: NextRequest, error: BaseError) {
  const { title, description } = error;

  const redirectURLErrorParams = new URL(siteConfig.paths.sign_in, req.url);

  redirectURLErrorParams.searchParams.append("error", title);

  if (description) {
    redirectURLErrorParams.searchParams.append(
      "error_description",
      description,
    );
  }

  return NextResponse.redirect(redirectURLErrorParams);
}
