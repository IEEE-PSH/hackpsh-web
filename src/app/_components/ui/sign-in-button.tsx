"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/app/_lib/client-utils";
import Link from "next/link";
import { siteConfig } from "@/app/_config/site";

type SignInButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function SignInButton({ className }: SignInButtonProps) {
  return (
    <Button className={cn("h-8 mr-4 font-semibold", className)} asChild>
      <Link href={siteConfig.paths.sign_in}>
        <span>Login</span>
        <ArrowRight className="w-4 h-4 ml-2" />
      </Link>
    </Button>
  )
}