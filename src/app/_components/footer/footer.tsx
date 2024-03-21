import React from "react";
import Link from "next/link";
import { siteConfig } from "@/app/_config/site";
import { Icons } from "../ui/icons";
import { Button } from "../ui/button";

export default function Footer() {
  return (
    <div className="border-t bg-background py-16">
      <nav className="flex flex-col">
        <Button variant="brand" size="navigation" asChild>
          <Link href={siteConfig.paths.home} scroll={true}>
            <Icons.brand className="h-[6rem] w-[5rem]" />
            <span className="text-4xl font-bold">
              {siteConfig.name}
            </span>
          </Link>
        </Button>
      </nav>

        {/* <div className="grid grid-cols-2 gap-8 whitespace-nowrap">
          <ul className="space-y-3">
            <p className=" font-bold">Follow Us</p>
            <li className="hover:underline">
              <Link href={siteConfig.links.linkedin} target="_blank">
                LinkedIn
              </Link>
            </li>
            <li className="hover:underline">
              <Link href={siteConfig.links.facebook} target="_blank">
                Facebook
              </Link>
            </li>
            <li className="hover:underline">
              <Link href={siteConfig.links.instagram} target="_blank">
                Instagram
              </Link>
            </li>
          </ul>

          <ul className="space-y-3">
            <p className=" font-bold">Directory</p>
            <li className="hover:underline">
              <Link href={siteConfig.paths.home}>Home</Link>
            </li>
            <li className="hover:underline">
              <Link href={siteConfig.paths.partners}>Partners</Link>
            </li>
            <li className="hover:underline">
              <Link href={siteConfig.paths.about}>About</Link>
            </li>
          </ul>

          <ul className="space-y-3">
            <p className=" font-bold">Legal</p>
            <li className="hover:underline">
              <Link href={siteConfig.paths.privacy_policy}>Privacy Policy</Link>
            </li>
            <li className="hover:underline">
              <Link href={siteConfig.paths.terms_of_service}>
                Terms of Service
              </Link>
            </li>
          </ul>

          <ul className="space-y-3">
            <p className=" font-bold">Blog</p>
            <li className="hover:underline">
              <Link href={siteConfig.links.blog} target="_blank">
                PSH IEEE
              </Link>
            </li>
          </ul>
        </div>*/}
      </div> 
  );
}
