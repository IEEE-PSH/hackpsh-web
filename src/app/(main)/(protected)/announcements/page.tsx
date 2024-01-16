import ProtectedSiteHeader from "@/app/_components/nav/protected-site-header";
import { type Metadata } from "next";
import { Announcements } from "@/app/_components/announcement/announcements";
import { AdminCreatePostLink } from "@/app/_components/announcement/admin-create-post-link";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Announcements | HackPSH",
  description: "Catch the latest updates within the competition!",
};

export default function AnnouncementsPage() {
  return (
    <>
      <div className="container flex-col items-center justify-center">
        <p className="m-10 text-center text-3xl font-bold">Announcements</p>
        <AdminCreatePostLink className="mb-4" />
        <Announcements />
      </div>
    </>
  );
}
