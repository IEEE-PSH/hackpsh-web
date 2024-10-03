import { CreateChallengeForm } from "@/app/_components/forms/create-challenge-form";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Announcement | HackPSH",
  description: "Create an announcement for everyone at the event.",
};

export default function CreateAnnouncementPage() {
  return (
    <div className="container my-4 mt-8 max-w-4xl">
      <CreateChallengeForm />
    </div>
  );
}
