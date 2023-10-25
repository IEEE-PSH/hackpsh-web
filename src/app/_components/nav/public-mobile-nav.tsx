"use client";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/app/_components/ui/sheet";
import { Button } from "@/app/_components/ui/button";
import { Menu } from "lucide-react";
import { Icons } from "../ui/icons";
import { siteConfig } from "@/app/_config/site";
import { MobileLink } from "./protected-mobile-nav";
import { SocialMediaMobileNav } from "./social-media-mobile-nav";

export function PublicMobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="px-0 mr-2 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="w-5 h-5" />
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
          <Icons.brand className="w-4 h-4 mr-2" />
          <span className="font-bold">{siteConfig.name}</span>
        </MobileLink>
        <div className="flex flex-col h-full pb-10 pl-6 my-4 space-y-3 text-base">
          <MobileLink
            href={siteConfig.paths.home}
            onOpenChange={setIsOpen}
            scroll={false}
          >
            Home
          </MobileLink>
          <MobileLink
            href={siteConfig.paths.about}
            onOpenChange={setIsOpen}
            scroll={false}
          >
            About
          </MobileLink>
          <MobileLink
            href={siteConfig.paths.partners}
            onOpenChange={setIsOpen}
            scroll={false}
          >
            Partners
          </MobileLink>


          <SocialMediaMobileNav setIsOpen={setIsOpen} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
