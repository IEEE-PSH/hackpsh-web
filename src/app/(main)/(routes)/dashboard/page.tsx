import { SiteHeader } from "@/app/_components/nav/site-header";
import { ProtectedMainNav } from "@/app/_components/nav/protected-main-nav";
import { ProtectedMobileNav } from "@/app/_components/nav/protected-mobile-nav";
import { SiteHeaderActions } from "@/app/_components/nav/site-header-actions";

export default function Page() {
  return (
    <div>
      <SiteHeader>
        <ProtectedMainNav />
        <ProtectedMobileNav />
        <SiteHeaderActions />
      </SiteHeader>
    </div>
  );
}
