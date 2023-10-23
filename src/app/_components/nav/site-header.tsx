import { type ReactNode } from "react";

export function SiteHeader({ children }: { children: ReactNode }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95">
      <div className="container flex items-center h-14">
        {children}
      </div>
    </header>
  )
}