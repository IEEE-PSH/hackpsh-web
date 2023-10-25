"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "../ui/icons";
import { cn } from "@/app/_lib/client-utils";
import { siteConfig } from "@/app/_config/site";

export function PublicMainNav() {
  const pathname = usePathname();

  return (
    <div className="hidden mr-4 md:flex">
      <Link
        href={siteConfig.paths.home}
        className="flex items-center mr-6 space-x-2"
        scroll={false}
      >
        <Icons.brand className="h-[2.4rem] w-[2.0rem] mr-2" />
        <span className="hidden font-bold sm:inline-block">{siteConfig.name}</span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href={siteConfig.paths.home}
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === siteConfig.paths.home ? "text-foreground" : "text-foreground/60"
          )}
          scroll={false}
        >
          Home
        </Link>
        <Link
          href={siteConfig.paths.about}
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname.startsWith(siteConfig.paths.about) ? "text-foreground" : "text-foreground/60"
          )}
          scroll={false}
        >
          About
        </Link>
        <Link
          href={siteConfig.paths.partners}
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname.startsWith(siteConfig.paths.partners) ? "text-foreground" : "text-foreground/60"
          )}
          scroll={false}
        >
          Partners
        </Link>
      </nav>
    </div>
  )
}