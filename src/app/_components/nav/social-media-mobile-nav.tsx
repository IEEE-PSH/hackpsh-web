import { type Dispatch, type SetStateAction } from "react";
import { MobileLink } from "./protected-mobile-nav";
import { siteConfig } from "@/app/_config/site";

export function SocialMediaMobileNav({ setIsOpen }: { setIsOpen: Dispatch<SetStateAction<boolean>> }) {
  return (
    <div className="flex flex-col pt-6 space-y-3">
      <h4 className="font-medium">Social Media</h4>
      <MobileLink
        href={siteConfig.links.instagram}
        onOpenChange={setIsOpen}
        target="_blank"
        rel="noreferrer"
        scroll={false}
      >
        Instagram
      </MobileLink>
    </div>
  )
}