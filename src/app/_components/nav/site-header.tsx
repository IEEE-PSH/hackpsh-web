import { type ReactNode } from "react";

export function SiteHeader({ children }: { children: ReactNode }) {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95">
      <div className="container flex h-14 items-center">{children}</div>
    </header>
  );
}
