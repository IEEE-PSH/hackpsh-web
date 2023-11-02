import ProtectedSiteHeader from "@/app/_components/nav/protected-site-header";
import { CreateAnnouncementPostForm } from "@/app/_components/forms/create-announcement-post-form";

export default function CreateAnnouncementPage() {
  return (
    <>
      <ProtectedSiteHeader />
      <div className="flex justify-center">
        <div className="mt-10 flex w-[38rem] justify-center">
          <CreateAnnouncementPostForm />
        </div>
      </div>
    </>
  );
}
