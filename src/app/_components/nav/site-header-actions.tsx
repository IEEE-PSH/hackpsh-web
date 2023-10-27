import { type ReactNode } from "react";

export function SiteHeaderActions({ children }: { children?: ReactNode }) {
  return (
    <div className="flex items-center justify-end flex-1 space-x-4">
      {children}
    </div>
  );
}
