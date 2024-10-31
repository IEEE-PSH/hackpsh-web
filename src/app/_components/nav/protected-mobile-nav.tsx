"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/app/_components/ui/sheet";
import { Button } from "@/app/_components/ui/button";
import { Menu } from "lucide-react";
import Link, { type LinkProps } from "next/link";
import { cn } from "@/app/_lib/client-utils";
import { Icons } from "../ui/icons";
import { siteConfig } from "@/app/_config/site";

export function ProtectedMobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <MobileLink
          href={siteConfig.paths.home}
          className="flex items-center"
          onOpenChange={setIsOpen}
          scroll={false}
        >
          <Icons.brand className="mr-2 h-6 w-6" />
          <span className="text-xl font-bold">{siteConfig.name}</span>
        </MobileLink>

        <div className="my-4 flex h-full flex-col space-y-3 pb-10 pl-6 text-base">
          <MobileLink
            href={siteConfig.paths.home}
            onOpenChange={setIsOpen}
            scroll={false}
            className="hover:underline"
          >
            Home
          </MobileLink>
          <MobileLink
            href={siteConfig.paths.dashboard}
            onOpenChange={setIsOpen}
            scroll={false}
            className="hover:underline"
          >
            Dashboard
          </MobileLink>
          <MobileLink
            href={siteConfig.paths.announcements}
            onOpenChange={setIsOpen}
            scroll={false}
            className="hover:underline"
          >
            Announcements
          </MobileLink>
          <MobileLink
            href={siteConfig.paths.leaderboard}
            onOpenChange={setIsOpen}
            scroll={false}
            className="hover:underline"
          >
            Leaderboard
          </MobileLink>
        </div>
      </SheetContent>
    </Sheet>
  );
}

type MobileLinkProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof LinkProps
> &
  LinkProps & {
    children?: React.ReactNode;
    onOpenChange?: (open: boolean) => void;
  } & React.RefAttributes<HTMLAnchorElement>;

export function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  return (
    <Link
      href={href}
      onClick={() => {
        onOpenChange?.(false);
      }}
      className={cn(className)}
      {...props}
      scroll={true}
    >
      {children}
    </Link>
  );
}
