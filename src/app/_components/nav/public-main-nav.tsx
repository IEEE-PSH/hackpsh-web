"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "../ui/icons";
import { cn } from "@/app/_lib/client-utils";
import { siteConfig } from "@/app/_config/site";
import { Button } from "../ui/button";

export function PublicMainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Button variant="brand" size="navigation" className="mr-6" asChild>
        <Link href={siteConfig.paths.home} scroll={true}>
          <Icons.brand className="h-8 w-8" />
          <span className="hidden text-xl font-bold sm:inline-block">
            {siteConfig.name}
          </span>
        </Link>
      </Button>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Button
          className={cn(
            pathname === siteConfig.paths.home
              ? "text-foreground"
              : "text-foreground/60",
          )}
          variant={"navigation"}
          size={"navigation"}
          asChild
        >
          <Link href={siteConfig.paths.home} scroll={true}>
            <span>Home</span>
          </Link>
        </Button>
        <Button
          className={cn(
            pathname === siteConfig.paths.partners
              ? "text-foreground"
              : "text-foreground/60",
          )}
          variant={"navigation"}
          size={"navigation"}
          asChild
        >
          <Link href={siteConfig.paths.partners} scroll={true}>
            <span>Partners</span>
          </Link>
        </Button>
        <Button
          className={cn(
            pathname === siteConfig.paths.about
              ? "text-foreground"
              : "text-foreground/60",
          )}
          variant={"navigation"}
          size={"navigation"}
          asChild
        >
          <Link href={siteConfig.paths.about} scroll={true}>
            <span>About</span>
          </Link>
        </Button>
        <Button
          className={cn(
            pathname === siteConfig.paths.contact
              ? "text-foreground"
              : "text-foreground/60",
          )}
          variant={"navigation"}
          size={"navigation"}
          asChild
        >
          <Link href={siteConfig.paths.contact} scroll={true}>
            <span>Contact</span>
          </Link>
        </Button>
      </nav>
    </div>
  );
}
