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
    <div className="container max-w-5xl">
      <Announcements />
    </div>
  );
}
