import { PublicMainNav } from "./_components/nav/public-main-nav";
import { PublicMobileNav } from "./_components/nav/public-mobile-nav";
import { SiteHeader } from "./_components/nav/site-header";

export default function Page() {
  return (
    <SiteHeader>
      <PublicMainNav />
      <PublicMobileNav />
    </SiteHeader>
  );
}
