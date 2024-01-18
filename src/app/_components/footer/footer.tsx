import React from "react";
import Link from "next/link";
import { siteConfig } from "@/app/_config/site";
import { Icons } from "../ui/icons";

export default function Footer() {
  return (
    <div className="absolute bottom-0 w-full bg-background py-16">
      <div className="container flex max-w-[80rem] flex-row items-start justify-center text-foreground lg:justify-between">
        <Link
          href={siteConfig.paths.home}
          className="hidden origin-top-left scale-[2] items-center space-x-2 lg:flex"
          scroll={false}
        >
          <Icons.brand className="h-[2.4rem] w-[2.0rem]" />
          <span className="hidden text-xl font-bold sm:inline-block">
            {siteConfig.name}
          </span>
        </Link>
        <div className="flex flex-row space-x-16 md:space-x-28 ">
          <div>
            <ul className="space-y-3"><p className=" font-bold">Follow Us</p>
              <li className="hover:underline">
                <a
                  href="https://www.linkedin.com/company/ieee-penn-state-harrisbrurg/"
                  target="_blank"
                >
                  LinkedIn
                </a>
              </li>
              <li className="hover:underline">
                <a
                  href="https://www.facebook.com/groups/183119638427039/"
                  target="_blank"
                >
                  Facebook
                </a>
              </li>
              <li className="hover:underline">
                <a href="https://www.instagram.com/psh.ieee/" target="_blank">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
          <div>
            
            <ul className="space-y-3"><p className=" font-bold">Directory</p>
              <li className="hover:underline">
                <Link href={siteConfig.paths.home}>Home</Link>
              </li>
              <li className="hover:underline">
                <Link href={siteConfig.paths.about}>About</Link>
              </li>
              <li className="hover:underline">
                <Link href={siteConfig.paths.partners}>Partners</Link>
              </li>
            </ul>
          </div>
          <div>
            
            <ul className="space-y-3"><p className=" font-bold">Legal</p>
              <li className="hover:underline">
                <Link href={siteConfig.paths.privacy_policy}>
                  Privacy Policy
                </Link>
              </li>
              <li className="hover:underline">
                <Link href={siteConfig.paths.terms_of_service}>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div className="hidden md:block">
            
            <ul className="space-y-3"><p className=" font-bold">Blog</p>
              <li className="hover:underline">
                <a href="https://edu.ieee.org/us-psu/" target="_blank">
                  PSH IEEE
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
