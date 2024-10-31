"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/app/_components/ui/sheet";
import { Button } from "@/app/_components/ui/button";
import { Menu } from "lucide-react";
import { Icons } from "../ui/icons";
import { siteConfig } from "@/app/_config/site";
import { MobileLink } from "./protected-mobile-nav";
import { SocialMediaMobileNav } from "./social-media-mobile-nav";
import Link from "next/link";

export function PublicMobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="mr-4 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
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
            scroll={true}
          >
            <Icons.brand className="mr-2 h-6 w-6" />
            <span className="text-xl font-bold">{siteConfig.name}</span>
          </MobileLink>
          <div className="my-4 flex h-full flex-col space-y-3 pb-10 pl-6 text-base">
            <MobileLink
              href={siteConfig.paths.home}
              onOpenChange={setIsOpen}
              scroll={true}
              className="hover:underline"
            >
              Home
            </MobileLink>
            <MobileLink
              href={siteConfig.paths.partners}
              onOpenChange={setIsOpen}
              scroll={true}
              className="hover:underline"
            >
              Partners
            </MobileLink>
            <MobileLink
              href={siteConfig.paths.about}
              onOpenChange={setIsOpen}
              scroll={true}
              className="hover:underline"
            >
              About
            </MobileLink>
            <MobileLink
              href={siteConfig.paths.contact}
              onOpenChange={setIsOpen}
              scroll={true}
              className="hover:underline"
            >
              Contact
            </MobileLink>
            <SocialMediaMobileNav setIsOpen={setIsOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <Button variant="brand" size="navigation" className="mr-6" asChild>
        <Link href={siteConfig.paths.home} scroll={true}>
          <Icons.brand className="h-8 w-8" />
          <span className="hidden text-xl font-bold sm:inline-block">
            {siteConfig.name}
          </span>
        </Link>
      </Button>
    </div>
  );
}
