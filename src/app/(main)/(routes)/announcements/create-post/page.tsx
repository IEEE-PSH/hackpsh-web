import ProtectedSiteHeader from "@/app/_components/nav/protected-site-header";
import { CreateAnnouncementPostForm } from "@/app/_components/forms/create-announcement-post-form";

export default function CreateAnnouncementPage() {
  return (
    <>
      <ProtectedSiteHeader />
      <h1 className="m-10 text-3xl font-bold text-center">Create an Announcement</h1>
      <div className="mt-10 flex-1 justify-center w-[40rem]">
        <CreateAnnouncementPostForm />
      </div>
    </>
  );
}
