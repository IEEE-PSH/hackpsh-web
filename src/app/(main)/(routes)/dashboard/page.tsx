import { SiteHeader } from "@/app/_components/nav/site-header";
import { ProtectedMainNav } from "@/app/_components/nav/protected-main-nav";
import { ProtectedMobileNav } from "@/app/_components/nav/protected-mobile-nav";
import { SiteHeaderActions } from "@/app/_components/nav/site-header-actions";
import SignOutButton from "@/app/_components/ui/sign-out-button";
import ProfileButton from "@/app/_components/nav/profile-button";

export default function Page() {
  return (
    <div>
      <SiteHeader>
        <ProtectedMainNav />
        <ProtectedMobileNav />
        <SiteHeaderActions>
          <ProfileButton />
        </SiteHeaderActions>
      </SiteHeader>
      <SignOutButton />
    </div>
  );
}
