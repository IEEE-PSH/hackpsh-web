"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/app/_lib/client-utils";
import { siteConfig } from "@/app/_config/site";
import { Button } from "../ui/button";
import { Icons } from "../ui/icons";
import { BarChart2, Bell, LayoutDashboard, Swords } from "lucide-react";

export function ProtectedSideNav() {
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-50 hidden min-h-screen min-w-72 self-start border-r bg-background/95 md:block">
      <div className="flex h-16">
        <Button variant="brand" size="navigation" className="mx-4" asChild>
          <Link href={siteConfig.paths.home} scroll={true}>
            <Icons.brand className="h-[2.4rem] w-[2.0rem]" />
            <span className="hidden text-xl font-bold sm:inline-block">
              {siteConfig.name}
            </span>
          </Link>
        </Button>
      </div>
      <div className="border-t">
        <nav className="m-4 flex flex-col">
          <Button
            className={cn(
              "justify-start font-normal",
              pathname === siteConfig.paths.dashboard
                ? "bg-accent text-accent-foreground"
                : "text-foreground/60 hover:bg-accent/50",
            )}
            variant={"ghost"}
            size={"default"}
            asChild
          >
            <Link href={siteConfig.paths.dashboard} scroll={true}>
              <LayoutDashboard className="mr-4" />
              <span>Dashboard</span>
            </Link>
          </Button>
          <Button
            className={cn(
              "justify-start font-normal",
              pathname === siteConfig.paths.challenges
                ? "bg-accent text-accent-foreground"
                : "text-foreground/60 hover:bg-accent/50",
            )}
            variant={"ghost"}
            size={"default"}
            asChild
          >
            <Link href={siteConfig.paths.challenges} scroll={true}>
              <Swords className="mr-4" />
              <span>Challenges</span>
            </Link>
          </Button>
          <Button
            className={cn(
              "justify-start font-normal",
              pathname === siteConfig.paths.leaderboard
                ? "bg-accent text-accent-foreground"
                : "text-foreground/60 hover:bg-accent/50",
            )}
            variant={"ghost"}
            size={"default"}
            asChild
          >
            <Link href={siteConfig.paths.leaderboard} scroll={true}>
              <BarChart2 className="mr-4" />
              <span>Leaderboard</span>
            </Link>
          </Button>
          <Button
            className={cn(
              "justify-start font-normal",
              pathname === siteConfig.paths.announcements
                ? "bg-accent text-accent-foreground"
                : "text-foreground/60 hover:bg-accent/50",
            )}
            variant={"ghost"}
            size={"default"}
            asChild
          >
            <Link href={siteConfig.paths.announcements} scroll={true}>
              <Bell className="mr-4" />
              <span>Announcements</span>
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
}
