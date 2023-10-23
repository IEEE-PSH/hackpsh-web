import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function UserAuthStatus() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  const { data: { session } } = await supabase.auth.getSession();

  if (session) {
    return (
      <p>Signed In</p>
    )
  } else {
    return (
      <p>Login</p>
    )
  }
}