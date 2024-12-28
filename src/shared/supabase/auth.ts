import { BaseError } from "@/shared/error";
import { type SupabaseClient } from "@supabase/supabase-js";

export async function getUser(supabase: SupabaseClient) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new BaseError({
      error_title: "Authentication Server Error",
      error_desc: "Cannot retrieve user information at this time.",
    });
  }

  return user;
}

export async function getSession(supabase: SupabaseClient) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new BaseError({
      error_title: "Authentication Server Error",
      error_desc: "Cannot retrieve user session at this time.",
    });
  }

  return session;
}
