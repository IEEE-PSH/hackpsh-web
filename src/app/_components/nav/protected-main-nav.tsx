"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "../ui/icons";
import { cn } from "@/app/_lib/client-utils";
import { siteConfig } from "@/app/_config/site";
import { Button } from "../ui/button";

export function ProtectedMainNav() {
  const pathname = usePathname();

  return (
    <div className="hidden mr-4 md:flex">
      <Button variant="brand" size="navigation" className="mr-6" asChild>
        <Link href={siteConfig.paths.home} scroll={true}>
          <Icons.brand className="h-[2.4rem] w-[2.0rem]" />
          <span className="hidden text-xl font-bold sm:inline-block">
            {siteConfig.name}
          </span>
        </Link>
      </Button>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Button className={cn(pathname === siteConfig.paths.dashboard ? "text-foreground" : "text-foreground/60")} variant={"navigation"} size={"navigation"} asChild>
          <Link href={siteConfig.paths.dashboard} scroll={true}>
            <span>Dashboard</span>
          </Link>
        </Button>
        <Button className={cn(pathname === siteConfig.paths.challenges ? "text-foreground" : "text-foreground/60")} variant={"navigation"} size={"navigation"} asChild>
          <Link href={siteConfig.paths.challenges} scroll={true}>
            <span>Challenges</span>
          </Link>
        </Button>
        <Button className={cn(pathname === siteConfig.paths.leaderboard ? "text-foreground" : "text-foreground/60")} variant={"navigation"} size={"navigation"} asChild>
          <Link href={siteConfig.paths.leaderboard} scroll={true}>
            <span>Leaderboard</span>
          </Link>
        </Button>
        <Button className={cn(pathname === siteConfig.paths.announcements ? "text-foreground" : "text-foreground/60")} variant={"navigation"} size={"navigation"} asChild>
          <Link href={siteConfig.paths.announcements} scroll={true}>
            <span>Announcements</span>
          </Link>
        </Button>
      </nav>
    </div>
  );
}
