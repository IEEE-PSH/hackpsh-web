import { ModeToggle } from "@/app/_components/ui/mode-toggle";
import SignOutButton from "@/app/_components/ui/sign-out-button";
import { serverTRPC } from "@/app/_trpc/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    const res = await serverTRPC.user.is_onboarding_complete.query({ user_uuid: session.user.id });

    return (
      <div>
        <p>{res.is_onboarding_complete}</p>
        <h1 className="text-xl">Dashboard</h1>
        <ModeToggle />
        <SignOutButton />
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-xl">Dashboard</h1>
      <ModeToggle />
      <SignOutButton />
    </div>
  )
}
