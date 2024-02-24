import Link from "next/link";
import { Button } from "../ui/button";
import Section from "./section";
import { siteConfig } from "@/app/_config/site";

export default function ContactSection({
  title,
  className,
}: {
  title: string;
  className: string;
}) {
  return (
    <Section className={className}>
      <div className="flex flex-col items-center text-center text-white">
        <p className="text-4xl font-bold">{title}</p>
        <Button
          className="text-md mt-8 w-48 bg-white hover:bg-white/80"
          asChild
        >
          <Link href={siteConfig.paths.contact}>Contact Us</Link>
        </Button>
      </div>
    </Section>
  );
}
