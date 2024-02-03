import ProtectedSiteHeader from "@/app/_components/nav/protected-site-header";
import { CreateAnnouncementPostForm } from "@/app/_components/forms/create-announcement-post-form";
import { type Metadata } from "next";
import { Button } from "@/app/_components/ui/button";
import { cn } from "@/app/_lib/client-utils";
import Link from "next/link";
import { siteConfig } from "@/app/_config/site";

export const metadata: Metadata = {
  title: "Create Announcement | HackPSH",
  description: "Create an announcement for everyone at the event.",
};

export default function CreateAnnouncementPage() {
  return (
    <>
      <ProtectedSiteHeader />
      <div className="container relative max-w-[65rem] flex-col items-center justify-center">
        <p className="m-10 text-center text-3xl font-bold">
          Create an Announcement
        </p>

        <Button
          className={cn("mb-4 h-8 font-semibold")}
          suppressHydrationWarning
          asChild
        >
          <Link href={siteConfig.paths.announcements} scroll={false}>
            <span>Back</span>
          </Link>
        </Button>
        <CreateAnnouncementPostForm />
      </div>
    </>
  );
}
