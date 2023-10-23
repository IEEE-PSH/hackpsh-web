import Link from "next/link";
import { cn } from "@/app/_lib/client-utils";
import { ModeToggle } from "@/app/_components/ui/mode-toggle";
import { buttonVariants } from "@/app/_components/ui/button";
import { Instagram } from "lucide-react";
import { siteConfig } from "@/app/_config/site";
import { type ReactNode } from "react";

export function SiteHeader({ children }: { children: ReactNode }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95">
      <div className="container flex items-center h-14">
        {children}
        <div className="flex items-center justify-end flex-1 space-x-2">
          <nav className="flex items-center">
            <Link
              href={siteConfig.links.instagram}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "w-9 px-0"
                )}
              >
                <Instagram className="w-4 h-4" />
                <span className="sr-only">Instagram</span>
              </div>
            </Link>
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}