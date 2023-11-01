import { type Metadata } from "next"
import Link from "next/link"
import { cn } from "@/app/_lib/client-utils"
import { buttonVariants } from "@/app/_components/ui/button"
import { UserAuthForm } from "@/app/_components/user-auth-form"
import { ModeToggle } from "@/app/_components/ui/mode-toggle"
import { Icons } from "@/app/_components/ui/icons"
import { siteConfig } from "@/app/_config/site"

export const metadata: Metadata = {
  title: "Sign Up | HackPSH",
  description: "Create an account to join the competition!",
}

export default function SignUpPage() {
  return (
    <>
      <div className="container relative grid flex-col items-center justify-center h-screen lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="absolute flex items-center flex-1 w-full text-lg font-medium top-4 md:top-8">
          <Link
            href={siteConfig.paths.home}
            className="flex flex-row items-center justify-start ml-4 space-x-2 lg:hidden"
            scroll={false}
          >
            <Icons.brand className="h-[2.4rem] w-[2.0rem] mr-2" />
            <span className="inline-block font-bold">{siteConfig.name}</span>
          </Link>
          <nav className="flex items-center justify-end flex-1 mr-4 space-x-2">
            <Link
              href={siteConfig.paths.sign_in}
              className={cn(buttonVariants({ variant: "ghost" }))}
              scroll={false}
            >
              Sign In
            </Link>
            <ModeToggle />
          </nav>
        </div>

        <div className="relative flex-col hidden h-full p-10 text-white bg-muted dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg">
            <Link
              href={siteConfig.paths.home}
              className="flex flex-row items-center justify-start space-x-2"
              scroll={false}
            >
              <Icons.brand className="h-[2.4rem] w-[2.0rem] mr-2" />
              <span className="hidden font-bold sm:inline-block">{siteConfig.name}</span>
            </Link>
          </div>
        </div>

        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-sm text-center text-muted-foreground">
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
  )
}