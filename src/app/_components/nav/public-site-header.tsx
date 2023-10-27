import { SiteHeader } from "@/app/_components/nav/site-header";
import { PublicMainNav } from "@/app/_components/nav/public-main-nav";
import { PublicMobileNav } from "@/app/_components/nav/public-mobile-nav";
import { SiteHeaderActions } from "@/app/_components/nav/site-header-actions";
import { SignInButton } from "@/app/_components/ui/sign-in-button";
import { ModeToggle } from "@/app/_components/ui/mode-toggle";

export default function PublicSiteHeader() {
  return (
    <div>
      <SiteHeader>
        <PublicMainNav />
        <PublicMobileNav />
        <SiteHeaderActions>
          <ModeToggle />
          <SignInButton />
        </SiteHeaderActions>
      </SiteHeader>
    </div>
  );
}
