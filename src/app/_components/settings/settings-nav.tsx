"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { siteConfig } from "@/app/_config/site";
import { cn } from "@/app/_lib/client-utils";
import { usePathname } from "next/navigation";

export default function SettingsNav({ userRole }: { userRole: string }) {
  const pathname = usePathname();
  return (
    <div className="container my-4 flex space-x-2">
      <Button
        className={cn(
          pathname === siteConfig.paths.account
            ? "bg-accent text-accent-foreground"
            : "text-foreground/60 hover:bg-accent/50",
          "rounded-full",
        )}
        variant="ghost"
        size="default"
        asChild
      >
        <Link href={siteConfig.paths.account} scroll={true}>
          <span>Account</span>
        </Link>
      </Button>
      {userRole === "admin" ? (
        <>
          <Button
            className={cn(
              pathname === siteConfig.paths.users
                ? "rounded-full bg-accent text-accent-foreground"
                : "text-foreground/60 hover:bg-accent/50",
              "rounded-full",
            )}
            variant="ghost"
            size="default"
            asChild
          >
            <Link href={siteConfig.paths.users} scroll={true}>
              <span>Users</span>
            </Link>
          </Button>
          <Button
            className={cn(
              pathname === siteConfig.paths.event
                ? "bg-accent text-accent-foreground"
                : "text-foreground/60 hover:bg-accent/50",
              "rounded-full",
            )}
            variant="ghost"
            size="default"
            asChild
          >
            <Link href={siteConfig.paths.event} scroll={true}>
              <span>Event</span>
            </Link>
          </Button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
