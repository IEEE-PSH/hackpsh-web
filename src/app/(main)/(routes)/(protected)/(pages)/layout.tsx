import AnnouncementNotifer from "@/app/_components/announcement/announcement-notifier";
import EventUpdateNotifer from "@/app/_components/event/event-update-notifier";
import { ProtectedMiniSideNav } from "@/app/_components/nav/protected-mini-side-nav";
import { ProtectedSideNav } from "@/app/_components/nav/protected-side-nav";
import ProtectedSiteHeader from "@/app/_components/nav/protected-site-header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <EventUpdateNotifer />
      <AnnouncementNotifer />

      <div className="min-h-screen bg-background">
        <ProtectedSiteHeader />
        <div>
          <ProtectedSideNav />
          <ProtectedMiniSideNav />
          <div className="py-4 md:ml-[72px] xl:ml-72">{children}</div>
        </div>
      </div>
    </>
  );
}
