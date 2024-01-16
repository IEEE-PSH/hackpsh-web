import { type ReactNode } from "react";

export function SiteHeader({ children }: { children: ReactNode }) {
  return (
    <div className="z-10 sticky top-0 w-full bg-background">
      <div className="container flex h-14 max-w-[64rem] items-center">
        {children}
      </div>
    </div>
  );
}
