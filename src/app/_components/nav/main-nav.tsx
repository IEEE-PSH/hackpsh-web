"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "../ui/icons";
import { cn } from "@/app/_lib/client-utils";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="hidden mr-4 md:flex">
      <Link
        href={process.env.NEXT_PUBLIC_HOME_PATH}
        className="flex items-center mr-6 space-x-2"
      >
        <Icons.brand className="h-[2.4rem] w-[2.0rem] mr-2" />
        <span className="hidden font-bold sm:inline-block">HackPSH</span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href={process.env.NEXT_PUBLIC_HOME_PATH}
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === process.env.NEXT_PUBLIC_HOME_PATH ? "text-foreground" : "text-foreground/60"
          )}
        >
          Home
        </Link>
        <Link
          href={process.env.NEXT_PUBLIC_CHALLENGES_PATH}
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname.startsWith(process.env.NEXT_PUBLIC_CHALLENGES_PATH) ? "text-foreground" : "text-foreground/60"
          )}
        >
          Challenges
        </Link>
        <Link
          href={process.env.NEXT_PUBLIC_LEADERBOARD_PATH}
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname.startsWith(process.env.NEXT_PUBLIC_LEADERBOARD_PATH) ? "text-foreground" : "text-foreground/60"
          )}
        >
          Leaderboard
        </Link>
        <Link
          href={process.env.NEXT_PUBLIC_ANNOUNCEMENTS_PATH}
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname.startsWith(process.env.NEXT_PUBLIC_ANNOUNCEMENTS_PATH) ? "text-foreground" : "text-foreground/60"
          )}
        >
          Announcements
        </Link>
        <Link
          href={process.env.NEXT_PUBLIC_DASHBOARD_PATH}
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname.startsWith(process.env.NEXT_PUBLIC_DASHBOARD_PATH) ? "text-foreground" : "text-foreground/60"
          )}
        >
          Dashboard
        </Link>
      </nav>
    </div>
  )
}