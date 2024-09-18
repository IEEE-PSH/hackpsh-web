import { ProtectedSideNav } from "@/app/_components/nav/protected-side-nav";
import ProtectedSiteHeader from "@/app/_components/nav/protected-site-header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* <ProtectedSideNav /> */}
        <div className="w-full">
          <ProtectedSiteHeader />
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
