import React from "react";
import Link from "next/link";
import { siteConfig } from "@/app/_config/site";
import { Icons } from "../ui/icons";
import { Button } from "../ui/button";

export default function Footer() {
  return (
    <div className="w-full border-t dark:bg-background-variant">
      <nav className="container flex flex-col lg:flex-row py-16 lg:justify-around">
        <Button variant="brand" size="navigation" className="pb-8" asChild>
          <Link href={siteConfig.paths.home} scroll={true}>
            <Icons.brand className="h-[6rem] w-[5rem]" />
            <span className="text-4xl font-bold">
              {siteConfig.name}
            </span>
          </Link>
        </Button>
        <div className="text-xl text-center gap-x-20 gap-y-8 grid grid-cols-2 md:grid-cols-4">
          <ul className="space-y-4">
            <p className="text-2xl font-bold">Follow Us</p>
            <li className="flex flex-col space-y-3">
              <Button variant="inline_link" size="navigation" className="text-base font-normal" asChild>
                <Link href={siteConfig.links.linkedin} target="_blank">
                  LinkedIn
                </Link>
              </Button>
              <Button variant="inline_link" size="navigation" className="text-base font-normal" asChild>
                <Link href={siteConfig.links.facebook} target="_blank">
                  Facebook
                </Link>
              </Button>
              <Button variant="inline_link" size="navigation" className="text-base font-normal" asChild>
                <Link href={siteConfig.links.instagram} target="_blank">
                  Instagram
                </Link>
              </Button>
            </li>
          </ul>

          <ul className="space-y-4">
            <p className="text-2xl font-bold">Directory</p>
            <li className="flex flex-col space-y-3">
              <Button variant="inline_link" size="navigation" className="text-base font-normal" asChild>
                <Link href={siteConfig.paths.home}>Home</Link>
              </Button>
              <Button variant="inline_link" size="navigation" className="text-base font-normal" asChild>
                <Link href={siteConfig.paths.partners}>Partners</Link>
              </Button>
              <Button variant="inline_link" size="navigation" className="text-base font-normal" asChild>
                <Link href={siteConfig.paths.about}>About</Link>
              </Button>
            </li>
          </ul>

          <ul className="space-y-4">
            <p className="text-2xl font-bold">Legal</p>
            <li className="flex flex-col space-y-3">
              <Button variant="inline_link" size="navigation" className="text-base font-normal" asChild>
                <Link href={siteConfig.paths.privacy_policy}>Privacy Policy</Link>
              </Button>
              <Button variant="inline_link" size="navigation" className="text-base font-normal" asChild>
                <Link href={siteConfig.paths.terms_of_service}>Terms of Service</Link>
              </Button>
            </li>
          </ul>

          <ul className="space-y-4">
            <p className="text-2xl font-bold">Blog</p>
            <li className="flex flex-col space-y-3">
              <Button variant="inline_link" size="navigation" className="text-base font-normal" asChild>
                <Link href={siteConfig.links.blog} target="_blank">
                  PSH IEEE
                </Link>
              </Button>
            </li>
          </ul>
        </div>
      </nav>
    </div> 
  );
}
