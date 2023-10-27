"use client";

import * as React from "react";
import DataTable from "@/app/_components/leaderboard/data-table";
import { SiteHeader } from "@/app/_components/nav/site-header";
import { ProtectedMainNav } from "@/app/_components/nav/protected-main-nav";
import { ProtectedMobileNav } from "@/app/_components/nav/protected-mobile-nav";
import { SiteHeaderActions } from "@/app/_components/nav/site-header-actions";

export default function Page() {
  return (
    <div>
      <SiteHeader>
        <ProtectedMainNav />
        <ProtectedMobileNav />
        <SiteHeaderActions />
      </SiteHeader>
      <div className="flex w-full flex-col items-center justify-center">
        <p className="text-center text-4xl font-bold tracking-tight">
          Leaderboard
        </p>
        <DataTable className="max-w-[60rem]" />
      </div>
    </div>
  );
}
