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
      <div className="mt-14 flex w-full flex-col items-center justify-center">
        <p className="mb-10 text-center text-3xl font-bold tracking-tight">
          Leaderboard
        </p>
        <DataTable className="max-w-[55rem]" />
      </div>
    </div>
  );
}
