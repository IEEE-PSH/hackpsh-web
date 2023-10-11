import { Button, buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Link from "next/link";


export default function Page() {
  return (
    <>
      <p>This is a sample change to see if they are propogated through CloudFlare dns and Vercel</p>
      <Button>ShadCN Test</Button>
      <Link href="/sign-up" className={buttonVariants({ variant: "link" })}>Register</Link>
      <Link href="/sign-in" className={buttonVariants({ variant: "link" })}>Login</Link>
      <ModeToggle />
    </>
  )
}