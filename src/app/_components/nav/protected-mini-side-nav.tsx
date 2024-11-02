"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/app/_lib/client-utils";
import { siteConfig } from "@/app/_config/site";
import { Button } from "../ui/button";
import { BarChart2, Bell, LayoutDashboard, Swords, Users } from "lucide-react";
import { Separator } from "../ui/separator";

export function ProtectedMiniSideNav() {
  const pathname = usePathname();

  return (
    <div className="fixed hidden min-h-screen border-r bg-background md:block lg:block xl:hidden 2xl:hidden">
      <div className="relative">
        <nav className="flex flex-col gap-4 p-4">
          <div className="flex flex-col">
            <Button
              className={cn(
                pathname === siteConfig.paths.dashboard
                  ? "bg-accent text-accent-foreground"
                  : "text-foreground/60 transition-none hover:bg-accent/50",
              )}
              variant={"ghost"}
              size={"icon"}
              asChild
            >
              <Link href={siteConfig.paths.dashboard} scroll={true}>
                <LayoutDashboard />
              </Link>
            </Button>
            <Button
              className={cn(
                pathname === siteConfig.paths.announcements
                  ? "bg-accent text-accent-foreground"
                  : "text-foreground/60 transition-none hover:bg-accent/50",
              )}
              variant={"ghost"}
              size={"icon"}
              asChild
            >
              <Link
                href={siteConfig.paths.announcements}
                scroll={true}
                className="m-0 p-0"
              >
                <Bell />
              </Link>
            </Button>
            <Button
              className={cn(
                pathname === siteConfig.paths.leaderboard
                  ? "bg-accent text-accent-foreground"
                  : "text-foreground/60 transition-none hover:bg-accent/50",
              )}
              variant={"ghost"}
              size={"icon"}
              asChild
            >
              <Link
                href={siteConfig.paths.leaderboard}
                scroll={true}
                className="m-0 p-0"
              >
                <BarChart2 />
              </Link>
            </Button>
          </div>
          <Separator />
          <div className="flex flex-col">
            <Button
              className={cn(
                pathname === siteConfig.paths.join_team
                  ? "bg-accent text-accent-foreground"
                  : "text-foreground/60 transition-none hover:bg-accent/50",
              )}
              variant={"ghost"}
              size={"icon"}
              asChild
            >
              <Link
                href={siteConfig.paths.join_team}
                scroll={true}
                className="m-0 p-0"
              >
                <Users />
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </div>
  );
}
