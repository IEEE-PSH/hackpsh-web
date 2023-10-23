"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/app/_lib/client-utils";
import Link from "next/link";

type SignInButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function SignInButton({ className }: SignInButtonProps) {
  return (
    <Button className={cn("h-8 mr-4 font-semibold", className)} asChild>
      <Link href="/sign-in">
        <span>Login</span>
        <ArrowRight className="w-4 h-4 ml-2" />
      </Link>
    </Button>
  )
}