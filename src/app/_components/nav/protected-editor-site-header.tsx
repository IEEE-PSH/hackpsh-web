"use client";
import { SiteHeaderActions } from "@/app/_components/nav/site-header-actions";
import ProfileButton from "@/app/_components/nav/profile-button";
import { type ReactNode } from "react";
import { ProtectedEditorMobileNav } from "./protected-editor-mobile-nav";

export default function ProtectedEditorSiteHeader({
  userDisplayName,
  userEmailAddress,
  children,
}: {
  userDisplayName: string;
  userEmailAddress: string;
  children: ReactNode;
}) {
  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="mx-4 flex h-16 items-center">
        <ProtectedEditorMobileNav />
        <SiteHeaderActions>
          {children}
          <ProfileButton
            userDisplayName={userDisplayName}
            userEmailAddress={userEmailAddress}
          />
        </SiteHeaderActions>
      </div>
    </header>
  );
}
