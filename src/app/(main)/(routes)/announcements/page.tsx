import React from "react";
import ProtectedSiteHeader from "@/app/_components/nav/protected-site-header";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Announcements | HackPSH",
  description: "Catch the latest updates within the competition!",
}

export default function AnnouncementsPage() {
  return (
    <div>
      <ProtectedSiteHeader />
      <p className="m-10 text-3xl font-bold text-center">Announcements</p>
    </div>
  );
}
