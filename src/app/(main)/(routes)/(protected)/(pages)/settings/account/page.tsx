import { Card, CardContent } from "@/app/_components/ui/card";
import { serverTRPC } from "@/app/_trpc/server";
import { createClient } from "@/server/lib/supabase/server";
import { getUser } from "@/shared/supabase/auth";
import UserSettingsForm from "@/app/_components/forms/user-settings-form";
import { Separator } from "@/app/_components/ui/separator";
import { Label } from "@/app/_components/ui/label";
import DeleteSelfAccountDialog from "@/app/_components/settings/delete-self-account-dialog";

export default async function Page() {
  const supabase = createClient();
  const user = await getUser(supabase);

  const userPersonalDetails =
    await serverTRPC.user.get_user_settings_info.query({
      user_uuid: user.id,
    });

  const userSupportDetails = await serverTRPC.user.get_user_support_info.query({
    user_uuid: user.id,
  });

  return (
    <div className="max-w-5xl space-y-4 sm:container">
      <Card className="border-0 sm:border">
        <CardContent className="p-8">
          <UserSettingsForm
            userPersonalDetails={userPersonalDetails}
            userSupportDetails={userSupportDetails}
          />
        </CardContent>
      </Card>
      <Card className="border-0 sm:border">
        <CardContent className="p-8">
          <h1 className="text-2xl font-semibold leading-none tracking-tight">
            Account Actions
          </h1>
          <Separator className="my-4" />
          <div className="flex flex-col justify-between space-y-4 sm:flex-row md:space-x-4">
            <div className="flex flex-col space-y-2">
              <Label>Delete your account</Label>
              <p className="text-sm text-muted-foreground">
                No longer using your account? You can delete your account here.
              </p>
            </div>
            <DeleteSelfAccountDialog />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
