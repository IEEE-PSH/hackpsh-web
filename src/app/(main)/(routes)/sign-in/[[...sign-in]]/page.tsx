import { type Metadata } from "next";
import Link from "next/link";
import { cn } from "@/app/_lib/client-utils";
import { buttonVariants } from "@/app/_components/ui/button";
import { UserAuthForm } from "@/app/_components/forms/user-auth-form";
import { ModeToggle } from "@/app/_components/ui/mode-toggle";
import { Icons } from "@/app/_components/ui/icons";
import { siteConfig } from "@/app/_config/site";
import { ToastErrorParams } from "@/app/_components/ui/toast-error-params";

export const metadata: Metadata = {
  title: "Sign In | HackPSH",
  description: "Get back to the competition!",
};

export default function SignIn() {
  return (
    <>
      <ToastErrorParams />
      <div className="container relative grid h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="absolute top-4 flex w-full flex-1 items-center text-lg font-medium md:top-8">
          <Link
            href={siteConfig.paths.home}
            className="ml-4 flex flex-row items-center justify-start space-x-2 lg:hidden"
            scroll={false}
          >
            <Icons.brand className="h-8 w-8" />
            <span className="inline-block text-xl font-bold">
              {siteConfig.name}
            </span>
          </Link>
          <nav className="mr-4 flex flex-1 items-center justify-end space-x-2">
            <Link
              href={siteConfig.paths.sign_up}
              className={cn(buttonVariants({ variant: "ghost" }))}
              scroll={false}
            >
              Sign Up
            </Link>
            <ModeToggle />
          </nav>
        </div>

        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg">
            <Link
              href={siteConfig.paths.home}
              className="flex flex-row items-center justify-start space-x-2"
              scroll={false}
            >
              <Icons.brand className="h-8 w-8" />
              <span className="hidden text-lg font-bold sm:inline-block">
                {siteConfig.name}
              </span>
            </Link>
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
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/info/terms-of-service"
                className="underline underline-offset-4 hover:text-primary-foreground hover:dark:text-primary"
                scroll={false}
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/info/privacy-policy"
                className="underline underline-offset-4 hover:text-primary-foreground hover:dark:text-primary"
                scroll={false}
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
