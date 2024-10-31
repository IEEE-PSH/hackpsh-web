"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/app/_lib/client-utils";
import { siteConfig } from "@/app/_config/site";
import { Button } from "../ui/button";
import { BarChart2, Bell, LayoutDashboard, Swords } from "lucide-react";

export function ProtectedMiniSideNav() {
  const pathname = usePathname();

  return (
    <div className="fixed hidden min-h-screen border-r bg-background md:block lg:block xl:hidden 2xl:hidden">
      <div className="relative">
        <nav className="m-4 flex flex-col">
          <Button
            className={cn(
              pathname === siteConfig.paths.dashboard
                ? "bg-accent text-accent-foreground"
                : "text-foreground/60 transition-none hover:bg-accent/50",
              "",
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
        </nav>
      </div>
    </div>
  );
}
