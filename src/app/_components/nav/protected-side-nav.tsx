"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/app/_lib/client-utils";
import { siteConfig } from "@/app/_config/site";
import { Button } from "../ui/button";
import { BarChart2, Bell, History, LayoutDashboard, Users } from "lucide-react";

export function ProtectedSideNav() {
  return (
    <nav className="fixed hidden h-[calc(100%-4rem-1px)] justify-between xl:min-w-72 border-r bg-background md:flex flex-col p-4">
      <div className="flex flex-col">
        <SideNavOption title="Dashboard" path={siteConfig.paths.dashboard}>
          <LayoutDashboard />
        </SideNavOption>
        <SideNavOption title="Announcements" path={siteConfig.paths.announcements}>
          <Bell />
        </SideNavOption>
        <SideNavOption title="Leaderboard" path={siteConfig.paths.leaderboard}>
          <BarChart2 />
        </SideNavOption>
        <SideNavOption title="Teams" path={siteConfig.paths.join_team}>
          <Users />
        </SideNavOption>
      </div>
      <div className="flex flex-col">
        <SideNavOption title="Challenge Archive" path={siteConfig.paths.challenge_archive}>
          <History />
        </SideNavOption>
      </div>
    </nav>
  );
}

function SideNavOption({children, title, path}:{children:React.ReactNode, title:string, path:string}){
  const pathname = usePathname()

  return (
    <Button
      className={cn(
        pathname === path
          ? "bg-accent text-accent-foreground"
          : "text-foreground/60 transition-none hover:bg-accent/50",
        "justify-start p-2 font-normal",
      )}
      variant={"ghost"}
      asChild
  >
    <Link href={path} scroll={true}>
      <div className="flex gap-4 items-center">
        {children}
        <span className="hidden xl:block">{title}</span>
      </div>
    </Link>
  </Button>
)
}