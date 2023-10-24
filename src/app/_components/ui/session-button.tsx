import { ArrowRight } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/app/_lib/client-utils";
import Link from "next/link";
import { siteConfig } from "@/app/_config/site";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

type SignInButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * For PUBLIC Page(s) only
 * Display Sign-In & Redirect to Sign In Page if the user does not have a session
 * Display Dashboard & Redirect to Dashboard Page if the user does have a session
 */
export async function SessionButton({ className }: SignInButtonProps) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data: { session } } = await supabase.auth.getSession();

  if (session) {
    return (
      <Button className={cn("h-8 mr-4 font-semibold", className)} asChild>
        <Link href={siteConfig.paths.dashboard} scroll={false}>
          <span>Dashboard</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </Button>
    )
  } else {
    return (
      <Button className={cn("h-8 mr-4 font-semibold", className)} asChild>
        <Link href={siteConfig.paths.sign_in} scroll={false}>
          <span>Login</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </Button>
    )
  }
}