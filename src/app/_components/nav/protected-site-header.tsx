import { ProtectedMainNav } from "@/app/_components/nav/protected-main-nav";
import { ProtectedMobileNav } from "@/app/_components/nav/protected-mobile-nav";
import { SiteHeaderActions } from "@/app/_components/nav/site-header-actions";
import ProfileButton from "@/app/_components/nav/profile-button";
import { composeServerComponentClient } from "@/server/lib/supabase/server";
import { getUser } from "@/shared/supabase/auth";
import { serverTRPC } from "@/app/_trpc/server";
import AdminCreatePost from "../announcement/admin-create-post";

export default async function ProtectedSiteHeader() {
  const supabase = composeServerComponentClient();
  const user = await getUser(supabase);
  const { user_display_name, user_email_address } =
    await serverTRPC.user.get_user_dropdown_info.query({
      user_uuid: user.id,
    });

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95">
      <div className="mx-8 flex h-16 items-center">
        <ProtectedMainNav />
        <ProtectedMobileNav />
        <SiteHeaderActions>
          <AdminCreatePost />
          <ProfileButton
            userDisplayName={user_display_name}
            userEmailAddress={user_email_address}
          />
        </SiteHeaderActions>
      </div>
    </header>
  );
}
