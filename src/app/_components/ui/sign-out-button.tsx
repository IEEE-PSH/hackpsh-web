"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/app/_components/ui/button";
import { useRouter } from "next/navigation";
import { cn } from "@/app/_lib/client-utils";

type SignOutButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

// Since we utilize JWTs for session management, we have to process the sign-out on
// client-side in order to clear out the cookies and invalidate the JWT.
export default function SignOutButton({ className, type }: SignOutButtonProps) {
  const supabase = createClientComponentClient();
  const router = useRouter();

  async function processSignOut() {
    await supabase.auth.signOut();
    router.push("/sign-in");
  }

  return (
    <Button
      onClick={processSignOut}
      type={type}
      className={cn("mr-4 h-8 font-semibold", className)}
    >
      Sign Out
    </Button>
  );
}