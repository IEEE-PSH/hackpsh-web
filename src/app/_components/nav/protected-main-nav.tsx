"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "../ui/icons";
import { cn } from "@/app/_lib/client-utils";
import { siteConfig } from "@/app/_config/site";

export function ProtectedMainNav() {
  const pathname = usePathname();

  return (
    <div className="hidden mr-4 md:flex">
      <Link
        href={siteConfig.paths.home}
        className="flex items-center mr-6 space-x-2"
      >
        <Icons.brand className="h-[2.4rem] w-[2.0rem] mr-2" />
        <span className="hidden font-bold sm:inline-block">{siteConfig.name}</span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href={siteConfig.paths.home}
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === siteConfig.paths.home ? "text-foreground" : "text-foreground/60"
          )}
        >
          Home
        </Link>
        <Link
          href={siteConfig.paths.challenges}
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname.startsWith(siteConfig.paths.challenges) ? "text-foreground" : "text-foreground/60"
          )}
        >
          Challenges
        </Link>
        <Link
          href={siteConfig.paths.leaderboard}
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname.startsWith(siteConfig.paths.leaderboard) ? "text-foreground" : "text-foreground/60"
          )}
        >
          Leaderboard
        </Link>
        <Link
          href={siteConfig.paths.announcements}
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname.startsWith(siteConfig.paths.announcements) ? "text-foreground" : "text-foreground/60"
          )}
        >
          Announcements
        </Link>
        <Link
          href={siteConfig.paths.dashboard}
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname.startsWith(siteConfig.paths.dashboard) ? "text-foreground" : "text-foreground/60"
          )}
        >
          Dashboard
        </Link>
      </nav>
    </div>
  )
}