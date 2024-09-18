import { type Metadata } from "next";
import { Announcements } from "@/app/_components/announcement/announcements";
import AdminCreatePost from "@/app/_components/announcement/admin-create-post";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Announcements | HackPSH",
  description: "Catch the latest updates within the competition!",
};

export default function AnnouncementsPage() {
  return (
    <div className="container my-8">
      <Announcements />
    </div>
  );
}
