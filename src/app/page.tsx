import { PublicMainNav } from "@/app/_components/nav/public-main-nav";
import { PublicMobileNav } from "@/app/_components/nav/public-mobile-nav";
import { SiteHeader } from "./_components/nav/site-header";
import { SessionButton } from "@/app/_components/ui/session-button";
import { SiteHeaderActions } from "@/app/_components/nav/site-header-actions";

export default function Page() {
  return (
    <SiteHeader>
      <PublicMainNav />
      <PublicMobileNav />
      <SiteHeaderActions>
        <SessionButton />
      </SiteHeaderActions>
    </SiteHeader>
  );
}
