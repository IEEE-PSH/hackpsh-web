import Link from "next/link";
import { Button } from "../ui/button";
import Section from "./section";
import { siteConfig } from "@/app/_config/site";
import { cn } from "@/app/_lib/client-utils";
import { type ComponentProps } from "react";

type ContactSectionProps = {
  title: string;
  cta: string;
} & ComponentProps<"section">;

export default function ContactSection({
  title,
  cta,
  className,
}: ContactSectionProps) {
  return (
    <Section className={cn(className, "border-t bg-background")}>
      <div className="flex flex-col items-center space-y-8">
        <h2 className="text-4xl font-bold text-foreground">{title}</h2>
        <Button variant="default" className="text-md w-48" asChild>
          <Link href={siteConfig.paths.contact} target="_blank">
            <span>{cta}</span>
          </Link>
        </Button>
      </div>
    </Section>
  );
}
