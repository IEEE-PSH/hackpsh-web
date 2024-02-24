import { type ReactNode } from "react";

export function SiteHeader({ children }: { children: ReactNode }) {
  return (
    <div className="sticky top-0 z-[2] w-full border-b bg-background/75 backdrop-blur-[.5rem]">
      <div className="container flex h-16 max-w-[80rem] items-center">
        {children}
      </div>
    </div>
  );
}
