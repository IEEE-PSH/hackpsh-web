import { Button, buttonVariants } from "@/app/_components/ui/button";
import { ModeToggle } from "@/app/_components/ui/mode-toggle";
import Link from "next/link";
import Navbar from "./_components/nav/navbar";

export default function Page() {
  return (
    <>
      <Navbar />
      <p>
        This is a sample change to see if they are propogated through CloudFlare
        dns and Vercel
      </p>
      <Button>ShadCN Test</Button>
      <Link href="/sign-up" className={buttonVariants({ variant: "link" })}>
        Register
      </Link>
      <Link href="/sign-in" className={buttonVariants({ variant: "link" })}>
        Login
      </Link>
      <ModeToggle />
    </>
  );
}
