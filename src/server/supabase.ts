import { type SupabaseClient } from "@supabase/auth-helpers-nextjs";

export async function getSessionFromContext(supabase: SupabaseClient) {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}
