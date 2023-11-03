import { TRPCError } from "@trpc/server";
import { type NextRequest } from "next/server";
import { siteConfig } from "@/app/_config/site";
import { redirectToSignInWithError } from "../server-utils";
import { BaseError } from "@/shared/error";

export default function handleError(req: NextRequest, cause: unknown) {
  // Ignore Errors Coming From Sign-In to prevent Infinite Redirect
  if (req.nextUrl.pathname.startsWith(siteConfig.paths.sign_in)) return;

  // If a user does not have a valid session or encounters
  // an error when retrieving a valid session, redirect to sign in.
  if (cause instanceof BaseError) {
    return redirectToSignInWithError(req, cause);
  }

  if (cause instanceof TRPCError) {
    const trpc_error = new BaseError({
      error_title: cause.code,
      error_desc: cause.message,
    });

    return redirectToSignInWithError(req, trpc_error);
  }

  const unknown_error = new BaseError({
    error_title: "Unknown Error",
    error_desc: null,
  });

  return redirectToSignInWithError(req, unknown_error);
}
