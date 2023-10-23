import { cn } from "@/app/_lib/client-utils";
import Link from "next/link";
import { Icons } from "@/app/_components/ui/icons";

export default function HackPSHLogo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("flex flex-row items-center text-lg font-semibold", className)}
    >
      <Icons.brand className="h-[2.4rem] w-[2.0rem] mr-2" />
      <span>HackPSH</span>
    </Link>
  );
}
