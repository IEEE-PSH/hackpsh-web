import { type ReactNode } from "react";

export function SiteHeader({ children }: { children: ReactNode }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center h-16 max-w-screen-2xl">
        {children}
      </div>
    </header>
  );
}
