import Link from "next/link";
import { Button } from "../ui/button";
import Section from "./section";
import { siteConfig } from "@/app/_config/site";
import { cn } from "@/app/_lib/client-utils";

export default function ContactSection({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <Section className={cn(className, "border-y bg-background")}>
      <div className="flex flex-col items-center ">
        <p className="text-4xl font-bold text-foreground">{title}</p>
        <Button
          className="text-md mt-8 w-48 bg-foreground text-background hover:bg-foreground/80"
          asChild
        >
          <Link href={siteConfig.paths.contact} className="text-background">
            Contact Us
          </Link>
        </Button>
      </div>
    </Section>
  );
}
