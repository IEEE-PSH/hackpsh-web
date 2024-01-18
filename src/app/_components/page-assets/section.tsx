import { cn } from "@/app/_lib/client-utils";
import { type ReactNode } from "react";

type SectionProps = {
  children: ReactNode
} & React.HTMLAttributes<HTMLElement>

export default function Section({children, className}: SectionProps) {
  return (
    <section className={cn(className)}>
      <div className="container max-w-[80rem] py-16">
        {children}
      </div>
    </section>
  );
}
