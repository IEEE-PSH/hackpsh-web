import AdminCreatePost from "@/app/_components/announcement/admin-create-post";
import ProfileButton from "@/app/_components/nav/profile-button";
import { ProtectedEditorMobileNav } from "@/app/_components/nav/protected-editor-mobile-nav";
import ProtectedEditorSiteHeader from "@/app/_components/nav/protected-editor-site-header";
import { ProtectedMobileNav } from "@/app/_components/nav/protected-mobile-nav";
import { ProtectedSideNav } from "@/app/_components/nav/protected-side-nav";
import ProtectedSiteHeader from "@/app/_components/nav/protected-site-header";
import { SiteHeaderActions } from "@/app/_components/nav/site-header-actions";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <ProtectedEditorSiteHeader />
      {children}
    </div>
  );
}
