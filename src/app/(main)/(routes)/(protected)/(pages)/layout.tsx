import { ProtectedSideNav } from "@/app/_components/nav/protected-side-nav";
import ProtectedSiteHeader from "@/app/_components/nav/protected-site-header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <ProtectedSideNav />
      <div className="flex">
        <div className="flex-grow md:ml-72">
          <ProtectedSiteHeader />
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
