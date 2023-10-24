import { ModeToggle } from "@/app/_components/ui/mode-toggle";
import { type ReactNode } from "react";

export function SiteHeaderActions({ children }: { children?: ReactNode }) {
  return (
    <div className="flex items-center justify-end flex-1 space-x-2">
      <nav className="flex items-center">
        {children}
        <ModeToggle />
      </nav>
    </div>
  )
}