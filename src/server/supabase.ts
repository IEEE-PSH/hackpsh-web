import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const getSessionFromContext = async () => {
  const cookieStore = cookies();
  const supabaseServerClient = createRouteHandlerClient({
    cookies: () => cookieStore,
  });

  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();

  return session;
};
