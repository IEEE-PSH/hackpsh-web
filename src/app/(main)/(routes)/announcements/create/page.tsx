import ProtectedSiteHeader from "@/app/_components/nav/protected-site-header";
import CreateAnnouncement from "@/app/_components/announcement/create-announcement";

export default function CreateAnnouncementPage() {
  return (
    <>
      <ProtectedSiteHeader />
      <div className="flex justify-center">
        <div className="mt-10 flex w-[38rem] justify-center">
          <CreateAnnouncement />
        </div>
      </div>
    </>
  );
}
