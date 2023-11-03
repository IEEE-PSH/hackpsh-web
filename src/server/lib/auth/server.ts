import { BaseError } from "@/shared/error";

/**
 * Retrieve Callback Token `code` from PKCE Auth Flow from URL parameters
 *
 * Throw an error if not found, and redirect user to sign-in
 */
export function retrieveCallbackToken(requestURL: URL) {
  const callbackToken = requestURL.searchParams.get("code");

  if (callbackToken === null) {
    throw new BaseError({
      error_title: "Authentication Error",
      error_desc: "Our authentication service is experiencing some issues.",
    });
  }

  return callbackToken;
}

/**
 * Validate whether incoming URL has an `error` parameter
 *
 * Throw an error if so, redircting user back to sign-in with
 * corresponding error.
 *
 * Supabase's GoTrueClient can hit our auth callback route with these
 * parameters when the session acquisition process fails.
 */
export function validateErrorURLParams(requestURL: URL) {
  const error_title = requestURL.searchParams.get("error");
  const error_desc = requestURL.searchParams.get("error_description");

  if (error_title) {
    throw new BaseError({ error_title, error_desc });
  }
}
