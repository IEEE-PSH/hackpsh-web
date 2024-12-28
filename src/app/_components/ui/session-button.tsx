import { ArrowRight } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/app/_lib/client-utils";
import Link from "next/link";
import { siteConfig } from "@/app/_config/site";
import { createClient } from "@/server/lib/supabase/server";

type SignInButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * For PUBLIC Page(s) only
 * Display Sign-In & Redirect to Sign In Page if the user does not have a session
 * Display Dashboard & Redirect to Dashboard Page if the user does have a session
 */
export async function SessionButton({ className }: SignInButtonProps) {
  const supabase = createClient(); //create client with passed cookies?

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    return (
      <Button className={cn("mr-4 h-8 font-semibold", className)} asChild>
        <Link href={siteConfig.paths.dashboard} scroll={false}>
          <span>Dashboard</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    );
  } else {
    return (
      <Button className={cn("mr-4 h-8 font-semibold", className)} asChild>
        <Link href={siteConfig.paths.sign_in} scroll={false}>
          <span>Login</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    );
  }
}
