import { SiteHeader } from "@/app/_components/nav/site-header";
import { ProtectedMainNav } from "@/app/_components/nav/protected-main-nav";
import { ProtectedMobileNav } from "@/app/_components/nav/protected-mobile-nav";

export default function Page() {
  return (
    <div>
      <SiteHeader>
        <ProtectedMainNav />
        <ProtectedMobileNav />
      </SiteHeader>
    </div>
  );
}
