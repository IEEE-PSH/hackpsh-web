"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/app/_lib/client-utils";
import { siteConfig } from "@/app/_config/site";
import { Button } from "../ui/button";
import { Icons } from "../ui/icons";

export function ProtectedSideNav() {
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-50 hidden min-h-screen min-w-56 self-start border-r bg-background/95 md:block">
      <div className="flex h-16">
        <Button variant="brand" size="navigation" className="mx-8" asChild>
          <Link href={siteConfig.paths.home} scroll={true}>
            <Icons.brand className="h-[2.4rem] w-[2.0rem]" />
            <span className="hidden text-xl font-bold sm:inline-block">
              {siteConfig.name}
            </span>
          </Link>
        </Button>
      </div>
      <div className="border-t">
        <nav className="mx-8 mt-8 flex flex-col space-y-2">
          <Button
            className={cn(
              "text-md justify-start font-normal",
              pathname === siteConfig.paths.dashboard
                ? "text-foreground"
                : "text-foreground/60",
            )}
            variant={"navigation"}
            size={"navigation"}
            asChild
          >
            <Link href={siteConfig.paths.dashboard} scroll={true}>
              <span>Dashboard</span>
            </Link>
          </Button>
          <Button
            className={cn(
              "text-md justify-start font-normal",
              pathname === siteConfig.paths.challenges
                ? "text-foreground"
                : "text-foreground/60",
            )}
            variant={"navigation"}
            size={"navigation"}
            asChild
          >
            <Link href={siteConfig.paths.challenges} scroll={true}>
              <span>Challenges</span>
            </Link>
          </Button>
          <Button
            className={cn(
              "text-md justify-start font-normal",
              pathname === siteConfig.paths.leaderboard
                ? "text-foreground"
                : "text-foreground/60",
            )}
            variant={"navigation"}
            size={"navigation"}
            asChild
          >
            <Link href={siteConfig.paths.leaderboard} scroll={true}>
              <span>Leaderboard</span>
            </Link>
          </Button>
          <Button
            className={cn(
              "text-md justify-start font-normal",
              pathname === siteConfig.paths.announcements
                ? "text-foreground"
                : "text-foreground/60",
            )}
            variant={"navigation"}
            size={"navigation"}
            asChild
          >
            <Link href={siteConfig.paths.announcements} scroll={true}>
              <span>Announcements</span>
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
}
