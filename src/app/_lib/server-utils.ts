import { type NextRequest, NextResponse } from "next/server";
import { siteConfig } from "../_config/site";

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

export class BaseError {
  public readonly title: string;
  public readonly description?: string | null;

  constructor(opts: { error_title: string; error_desc: string | null }) {
    this.title = opts.error_title;
    this.description = "Something unexpected has occurred.";
    if (opts.error_desc) {
      this.description = opts.error_desc;
    }
  }
}
