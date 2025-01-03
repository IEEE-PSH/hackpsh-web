import { ProtectedMobileNav } from "@/app/_components/nav/protected-mobile-nav";
import { SiteHeaderActions } from "@/app/_components/nav/site-header-actions";
import ProfileButton from "@/app/_components/nav/profile-button";
import { createClient } from "@/server/lib/supabase/server";
import { getUser } from "@/shared/supabase/auth";
import { serverTRPC } from "@/app/_trpc/server";
import AdminCreatePost from "../announcement/admin-create-post";
import CreateChallenge from "../challenges/create-challenge";
import { ProtectedMainNav } from "./protected-main-nav";

export default async function ProtectedSiteHeader() {
  const supabase = createClient();
  const user = await getUser(supabase);
  const { user_display_name, user_email_address } =
    await serverTRPC.user.get_user_dropdown_info.query({
      user_uuid: user.id,
    });

  return (
    <header className="sticky top-0 z-10 border-b bg-background">
      <div className="mx-4 flex h-16 items-center">
        <ProtectedMobileNav />
        <ProtectedMainNav />
        <SiteHeaderActions>
          <CreateChallenge />
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
