"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/app/_lib/client-utils";
import { siteConfig } from "@/app/_config/site";
import { Button } from "../ui/button";
import { BarChart2, Bell, LayoutDashboard, Swords } from "lucide-react";

export function ProtectedSideNav() {
  const pathname = usePathname();

  return (
    <div className="fixed hidden min-h-screen min-w-72 border-r bg-background xl:block">
      <div className="relative">
        <nav className="m-4 flex flex-col">
          <Button
            className={cn(
              pathname === siteConfig.paths.dashboard
                ? "bg-accent text-accent-foreground"
                : "text-foreground/60 transition-none hover:bg-accent/50",
              "justify-start p-2 font-normal",
            )}
            variant={"ghost"}
            asChild
          >
            <Link href={siteConfig.paths.dashboard} scroll={true}>
              <LayoutDashboard className="mr-4" />
              <span>Dashboard</span>
            </Link>
          </Button>
          <Button
            className={cn(
              pathname === siteConfig.paths.announcements
                ? "bg-accent text-accent-foreground"
                : "text-foreground/60 transition-none hover:bg-accent/50",
              "justify-start p-2 font-normal",
            )}
            variant={"ghost"}
            asChild
          >
            <Link href={siteConfig.paths.announcements} scroll={true}>
              <Bell className="mr-4" />
              <span>Announcements</span>
            </Link>
          </Button>
          <Button
            className={cn(
              pathname === siteConfig.paths.leaderboard
                ? "bg-accent text-accent-foreground"
                : "text-foreground/60 transition-none hover:bg-accent/50",
              "justify-start p-2 font-normal",
            )}
            variant={"ghost"}
            asChild
          >
            <Link href={siteConfig.paths.leaderboard} scroll={true}>
              <BarChart2 className="mr-4" />
              <span>Leaderboard</span>
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
}
