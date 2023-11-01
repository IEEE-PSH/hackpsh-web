"use client";

import * as React from "react";
import DataTable from "@/app/_components/leaderboard/data-table";
import { SiteHeader } from "@/app/_components/nav/site-header";
import { ProtectedMainNav } from "@/app/_components/nav/protected-main-nav";
import { ProtectedMobileNav } from "@/app/_components/nav/protected-mobile-nav";
import { SiteHeaderActions } from "@/app/_components/nav/site-header-actions";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Leaderboard | HackPSH",
  description: "See where your team stands amongst the competition.",
}

export default function LeaderboardPage() {
  return (
    <div>
      <SiteHeader>
        <ProtectedMainNav />
        <ProtectedMobileNav />
        <SiteHeaderActions />
      </SiteHeader>
      <div className="flex flex-col items-center justify-center w-full mt-14">
        <p className="mb-10 text-3xl font-bold tracking-tight text-center">
          Leaderboard
        </p>
        <DataTable className="max-w-[55rem]" />
      </div>
    </div>
  );
}
