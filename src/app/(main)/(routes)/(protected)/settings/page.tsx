import SupportUsForm from "@/app/_components/settings/support-us-form";
import PersonalDetailsForm from "@/app/_components/settings/personal-details-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { serverTRPC } from "@/app/_trpc/server";
import { composeServerComponentClient } from "@/server/lib/supabase/server";
import { getUser } from "@/shared/supabase/auth";
import { cn } from "@/app/_lib/client-utils";

export default async function Page() {
  const supabase = composeServerComponentClient();
  const user = await getUser(supabase);

  const {
    user_display_name,
    user_email_address,
    user_school_year,
    user_major,
  } = await serverTRPC.user.get_user_settings_info.query({
    user_uuid: user.id,
  });

  const { user_support_administrative, user_support_technical } =
    await serverTRPC.user.get_user_support_info.query({
      user_uuid: user.id,
    });

  return (
    <>
      <div className="container mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className={cn("grid-gap-6")}>
          <CardHeader>
            <CardTitle>Personal Details</CardTitle>
          </CardHeader>
          <CardContent>
            <PersonalDetailsForm
              userDisplayName={user_display_name}
              userEmailAddress={user_email_address}
              userSchoolYear={user_school_year}
              userMajor={user_major}
            />
          </CardContent>
        </Card>

        <Card className={cn("grid-gap-6")}>
          <CardHeader>
            <CardTitle>Support Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <SupportUsForm
              userSupportAdministrative={user_support_administrative!}
              userSupportTechnical={user_support_technical!}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
