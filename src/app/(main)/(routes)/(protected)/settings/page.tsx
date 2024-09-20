import { Card, CardContent } from "@/app/_components/ui/card";
import { serverTRPC } from "@/app/_trpc/server";
import { composeServerComponentClient } from "@/server/lib/supabase/server";
import { getUser } from "@/shared/supabase/auth";
import { cn } from "@/app/_lib/client-utils";
import UserSettingsForm from "@/app/_components/settings/user-settings-form";

export default async function Page() {
  const supabase = composeServerComponentClient();
  const user = await getUser(supabase);

  const {
    user_display_name,
    user_email_address,
    user_school_year,
    user_major,
    user_team_name,
  } = await serverTRPC.user.get_user_settings_info.query({
    user_uuid: user.id,
  });

  const { user_support_administrative, user_support_technical } =
    await serverTRPC.user.get_user_support_info.query({
      user_uuid: user.id,
    });

  return (
    <div className="container my-4">
      <Card>
        <CardContent className="p-8">
          <UserSettingsForm
            userDisplayName={user_display_name!}
            userEmailAddress={user_email_address!}
            userSchoolYear={user_school_year!}
            userMajor={user_major!}
            userSupportAdministrative={user_support_administrative!}
            userSupportTechnical={user_support_technical!}
            userTeamName={user_team_name!}
          />
        </CardContent>
      </Card>
    </div>
  );
}
