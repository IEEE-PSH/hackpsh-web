import AnnouncementNotifer from "@/app/_components/announcement/announcement-notifier";
import ChallengeBooter from "@/app/_components/challenges/challenge-booter";
import { ProtectedSideNav } from "@/app/_components/nav/protected-side-nav";
import ProtectedSiteHeader from "@/app/_components/nav/protected-site-header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ChallengeBooter />
      <AnnouncementNotifer />
      <div className="flex min-h-screen bg-background">
        <ProtectedSideNav />

        <div className="flex-grow md:ml-72">
          <ProtectedSiteHeader />
          <div>{children}</div>
        </div>
      </div>
    </>
  );
}
