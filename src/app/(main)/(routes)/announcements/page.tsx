import React from "react";
import ProtectedSiteHeader from "@/app/_components/nav/protected-site-header";

export default function AnnouncementsPage() {
  return (
    <div>
      <ProtectedSiteHeader />
      <p className="m-10 text-center text-3xl font-bold">Announcements</p>
    </div>
  );
}
