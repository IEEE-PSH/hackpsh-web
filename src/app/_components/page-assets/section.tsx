import { cn } from "@/app/_lib/client-utils";
import { type ReactNode, type ComponentProps } from "react";

type SectionProps = {
  children: ReactNode;
} & ComponentProps<"section">

export default function Section({ children, className }: SectionProps) {
  return (
    <section className={cn(className)}>
      <div className="container py-16">{children}</div>
    </section>
  );
}
