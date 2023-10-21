"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/app/_components/ui/button";
import { useRouter } from "next/navigation";

// Since we utilize JWTs for session management, we have to process the sign-out on
// client-side in order to clear out the cookies and invalidate the JWT.
export default function SignOutButton() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  async function handleOnClick() {
    await supabase.auth.signOut();
    router.push('/sign-in')
  }

  return (
    <Button onClick={handleOnClick}>
      Sign Out
    </Button>
  )
}