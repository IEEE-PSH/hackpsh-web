import ProtectedSiteHeader from "@/app/_components/nav/protected-site-header";
import { type Metadata } from "next";
import { Announcements } from "@/app/_components/announcement/announcements";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Announcements | HackPSH",
  description: "Catch the latest updates within the competition!",
};

export default async function AnnouncementsPage() {
  return (
    <div>
      <ProtectedSiteHeader />
      <p className="m-10 text-center text-3xl font-bold">Announcements</p>
      <Announcements />
    </div>
  );
}
