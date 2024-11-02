import TeamSettingsForm from "@/app/_components/forms/team-settings-form";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { serverTRPC } from "@/app/_trpc/server";
import { composeServerComponentClient } from "@/server/lib/supabase/server";
import { getUser } from "@/shared/supabase/auth";

export default async function Page() {
  const supabase = composeServerComponentClient();
  const user = await getUser(supabase);

  const teamData = await serverTRPC.user.get_user_team_info.query({
    user_uuid: user.id,
  });

  return (
    <div className="grid max-w-5xl gap-4 sm:container sm:grid-cols-2">
      <Card className="border-0 sm:border">
        <CardContent className="p-8">
          <TeamSettingsForm teamData={teamData} />
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-8">
          <h1 className="text-2xl font-semibold leading-none tracking-tight">
            Members
          </h1>
          <Separator className="my-4" />
        </CardContent>
      </Card>
    </div>
  );
}
