import { buttonVariants } from "@/app/_components/ui/button";
import Link from "next/link";
export default function LoginButton() {
  return (
    <Link
      href="/sign-in"
      className={`ml-[16px] ${buttonVariants({ variant: "default" })}`}
    >
      Login
    </Link>
  );
}
