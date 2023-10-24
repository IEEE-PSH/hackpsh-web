import { ModeToggle } from "@/app/_components/ui/mode-toggle";
import { type ReactNode } from "react";
import ProfileButton from "@/app/_components/nav/profile-button";

export function SiteHeaderActions({ children }: { children?: ReactNode }) {
  return (
    <div className="flex flex-1 items-center justify-end space-x-2">
      <nav className="flex items-center">
        {children}
        <ModeToggle />
        <ProfileButton />
      </nav>
    </div>
  );
}
