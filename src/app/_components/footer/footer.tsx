import React from "react";
import Section from "../page-assets/section";
import Link from "next/link";
import { siteConfig } from "@/app/_config/site";
import { Icons } from "../ui/icons";

export default function Footer() {
  return (
    <Section bg="bg-background" className="">
      <div className="flex flex-row items-start justify-center text-foreground lg:justify-between">
        <Link
          href={siteConfig.paths.home}
          className="mr-auto hidden origin-top-left scale-[2] items-center space-x-2 lg:flex"
          scroll={false}
        >
          <Icons.brand className="h-[2.4rem] w-[2.0rem]" />
          <span className="hidden text-xl font-bold sm:inline-block">
            {siteConfig.name}
          </span>
        </Link>
        <div className="flex flex-row space-x-20">
          <div>
            <p className="text-lg font-bold">Follow Us</p>
            <ul className="text-lg">
              <li>LinkedIn</li>
              <li>Facebook</li>
              <li>Instagram</li>
            </ul>
          </div>
          <div>
            <p className="text-lg font-bold">Directory</p>
            <ul className="text-lg">
              <li>Home</li>
              <li>About</li>
              <li>Partners</li>
            </ul>
          </div>
          <div>
            <p className="text-lg font-bold">Information</p>
            <ul className="text-lg">
              <li>Contact</li>
              <li>Privacy Policy</li>
              <li>Terms and Service</li>
            </ul>
          </div>
          <div className="hidden md:block">
            <p className="text-lg font-bold">Other Links</p>
            <ul>
              <li>PSH IEEE</li>
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
