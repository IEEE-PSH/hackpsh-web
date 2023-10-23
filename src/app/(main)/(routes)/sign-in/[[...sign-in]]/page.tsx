import { type Metadata } from "next";
import Link from "next/link";
import { cn } from "@/app/_lib/client-utils";
import { buttonVariants } from "@/app/_components/ui/button";
import { UserAuthForm } from "@/app/_components/user-auth-form";
import { ModeToggle } from "@/app/_components/ui/mode-toggle";
import { Icons } from "@/app/_components/ui/icons";

export const metadata: Metadata = {
  title: "HackPSH | Sign In",
  description: "Get back to the competition!",
};

export default function SignIn() {
  return (
    <>
      <div className="container relative grid flex-col items-center justify-center h-screen lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="absolute flex items-center text-lg font-medium left-4 top-4 md:right-8 md:top-8 lg:hidden">
          <Icons.brand className="h-[2.4rem] w-[2.0rem] mr-2" />
          <span>HackPSH</span>
        </div>

        <Link
          href={process.env.NEXT_PUBLIC_SIGN_UP_PATH}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8",
          )}
        >
          Sign Up
        </Link>

        <div className="absolute right-28 top-4 md:right-32 md:top-8">
          <ModeToggle />
        </div>

        <div className="relative flex-col hidden h-full p-10 text-white bg-muted dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Icons.brand className="h-[2.4rem] w-[2.0rem] mr-2" />
            <span>HackPSH</span>
          </div>
        </div>

        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Sign in to your account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to sign in
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-sm text-center text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/info/terms-of-service"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/info/privacy-policy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
