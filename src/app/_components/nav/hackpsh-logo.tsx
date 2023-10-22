import { cn } from "@/app/_lib/client-utils";
import Link from "next/link";
import { Icons } from "@/app/_components/ui/icons";

export default function HackPSHLogo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("flex flex-row items-center text-xl font-bold", className)}
    >
      <div className={cn("mr-1 w-8 overflow-visible")}>
        <Icons.brand />
      </div>
      HackPSH
    </Link>
  );
}
