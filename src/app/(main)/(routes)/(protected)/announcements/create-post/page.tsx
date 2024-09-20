import { CreateAnnouncementPostForm } from "@/app/_components/forms/create-announcement-post-form";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Announcement | HackPSH",
  description: "Create an announcement for everyone at the event.",
};

export default function CreateAnnouncementPage() {
  return (
    <div className="container my-8 max-w-4xl">
      <h1 className="mb-6 text-2xl font-semibold">Create Announcement</h1>
      <CreateAnnouncementPostForm />
    </div>
  );
}
