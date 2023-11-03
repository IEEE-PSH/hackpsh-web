import ProtectedSiteHeader from "@/app/_components/nav/protected-site-header";
import { type Metadata } from "next";
import { Announcements } from "@/app/_components/announcement/announcements";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Announcements | HackPSH",
  description: "Catch the latest updates within the competition!",
};

export default function AnnouncementsPage() {
  return (
    <>
      <div>
        <ProtectedSiteHeader />
      </div>
      <div className="container relative flex-col items-center justify-center">
        <p className="m-10 text-3xl font-bold text-center">Announcements</p>
        <Announcements />
      </div>
    </>
  );
}
