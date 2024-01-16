import ProtectedSiteHeader from "@/app/_components/nav/protected-site-header";
import { CreateAnnouncementPostForm } from "@/app/_components/forms/create-announcement-post-form";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Announcement | HackPSH",
  description: "Create an announcement for everyone at the event.",
};

export default function CreateAnnouncementPage() {
  return (
    <>
      <div className="container relative flex-col items-center justify-center space-y-6">
        <h1 className="mt-10 text-3xl font-bold">Create Announcement</h1>
        <CreateAnnouncementPostForm />
      </div>
    </>
  );
}
