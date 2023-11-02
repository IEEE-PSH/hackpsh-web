import { SupabaseClient } from "@supabase/auth-helpers-nextjs";

export async function getUser(supabase: SupabaseClient) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User cannot be retrieved from current session.");
  }
  return user;
}

export async function getSession(supabase: SupabaseClient) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("Session cannot be found.");
  }

  return session;
}
