import { SiteHeaderActions } from "@/app/_components/nav/site-header-actions";
import ProfileButton from "@/app/_components/nav/profile-button";
import { composeServerComponentClient } from "@/server/lib/supabase/server";
import { getUser } from "@/shared/supabase/auth";
import { serverTRPC } from "@/app/_trpc/server";
import { ProtectedEditorMobileNav } from "./protected-editor-mobile-nav";
import { Button } from "../ui/button";
import { ArrowLeft, Play } from "lucide-react";

export default async function ProtectedEditorSiteHeader() {
  const supabase = composeServerComponentClient();
  const user = await getUser(supabase);
  const { user_display_name, user_email_address } =
    await serverTRPC.user.get_user_dropdown_info.query({
      user_uuid: user.id,
    });

  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="mx-4 flex h-16 items-center">
        <ProtectedEditorMobileNav />
        <SiteHeaderActions>
          <Button variant="secondary" className="ml-4 mr-auto">
            <ArrowLeft className="mr-4" />
            <span>Challenges</span>
          </Button>
          <Button>
            <Play className="mr-4" />
            <span>Run</span>
          </Button>
          <ProfileButton
            userDisplayName={user_display_name}
            userEmailAddress={user_email_address}
          />
        </SiteHeaderActions>
      </div>
    </header>
  );
}
