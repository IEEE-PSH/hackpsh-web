import { type ReactNode } from "react";

export function SiteHeader({ children }: { children: ReactNode }) {
  return (
    <div className="sticky top-0 z-10 w-full border-b-[1px] bg-background shadow-sm">
      <div className="container flex h-16 max-w-[80rem] items-center">
        {children}
      </div>
    </div>
  );
}
