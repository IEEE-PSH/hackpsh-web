"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "../ui/icons";
import { cn } from "@/app/_lib/client-utils";
import { siteConfig } from "@/app/_config/site";

export function ProtectedMainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link
        href={siteConfig.paths.home}
        className="mr-6 flex items-center space-x-2"
        scroll={true}
      >
        <Icons.brand className="h-[2.4rem] w-[2.0rem]" />
        <span className="hidden text-xl font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href={siteConfig.paths.challenges}
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname.startsWith(siteConfig.paths.challenges)
              ? "text-foreground"
              : "text-foreground/60",
          )}
          scroll={true}
        >
          Challenges
        </Link>
        <Link
          href={siteConfig.paths.leaderboard}
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname.startsWith(siteConfig.paths.leaderboard)
              ? "text-foreground"
              : "text-foreground/60",
          )}
          scroll={true}
        >
          Leaderboard
        </Link>
        <Link
          href={siteConfig.paths.announcements}
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname.startsWith(siteConfig.paths.announcements)
              ? "text-foreground"
              : "text-foreground/60",
          )}
          scroll={true}
        >
          Announcements
        </Link>
        <Link
          href={siteConfig.paths.dashboard}
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname.startsWith(siteConfig.paths.dashboard)
              ? "text-foreground"
              : "text-foreground/60",
          )}
          scroll={true}
        >
          Dashboard
        </Link>
      </nav>
    </div>
  );
}
