import DashboardTeamInfo from "@/app/_components/dashboard/dashboard-team-info";
import TeamSettingsForm from "@/app/_components/forms/team-settings-form";
import DeleteSelfTeamDialog from "@/app/_components/settings/delete-self-team-dialog";
import TeamLeaveDialog from "@/app/_components/teams/team-leave-dialog";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Label } from "@/app/_components/ui/label";
import { Separator } from "@/app/_components/ui/separator";
import { siteConfig } from "@/app/_config/site";
import { serverTRPC } from "@/app/_trpc/server";
import { composeServerComponentClient } from "@/server/lib/supabase/server";
import { getUser } from "@/shared/supabase/auth";
import Link from "next/link";

export default async function Page() {
  const supabase = composeServerComponentClient();
  const user = await getUser(supabase);

  const { is_on_team } = await serverTRPC.user.is_on_team.query({
    user_uuid: user.id,
  });
  if (is_on_team) {
    const teamData = await serverTRPC.user.get_user_team_info.query({
      user_uuid: user.id,
    });

    if (is_on_team)
      return (
        <div className="grid max-w-5xl gap-4 sm:container">
          <Card className="border-0 sm:border">
            <CardContent className="p-8">
              <TeamSettingsForm teamData={teamData} />
            </CardContent>
          </Card>
          <Card className="border-0 sm:border">
            <CardContent className="p-8">
              <h1 className="text-2xl font-semibold leading-none tracking-tight">
                Members
              </h1>
              <Separator className="mt-4" />
              <div className="gap-4">
                {teamData.team_members.map((member, i) => (
                  <>
                    <div key={`member-${i}`} className="flex items-center py-4">
                      <span className="mr-auto">
                        {member.user_display_name}
                      </span>
                      <Button variant="secondary" className="ml-4 h-8">
                        Promote
                      </Button>
                      <Button variant="secondary" className="ml-2 h-8">
                        Kick
                      </Button>
                    </div>
                    {i < teamData.team_members.length - 1 && <Separator />}
                  </>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 sm:border">
            <CardContent className="p-8">
              <h1 className="text-2xl font-semibold leading-none tracking-tight">
                Team Actions
              </h1>
              <Separator className="my-4" />
              <div className="flex flex-col justify-between space-y-4 sm:flex-row md:space-x-4">
                <div className="flex flex-col space-y-2">
                  <Label>Leave your team</Label>
                  <p className="text-sm text-muted-foreground">
                    You can leave your team to join other teams.
                  </p>
                </div>
                <TeamLeaveDialog userUUID={user.id} />
              </div>
              <div className="mt-6 flex flex-col justify-between space-y-4 sm:flex-row md:space-x-4">
                <div className="flex flex-col space-y-2">
                  <Label>Delete your team</Label>
                  <p className="text-sm text-muted-foreground">
                    You can delete your team. This will kick all members from
                    the team.
                  </p>
                </div>
                <DeleteSelfTeamDialog />
              </div>
            </CardContent>
          </Card>
        </div>
      );
  }

  return (
    <div className="grid max-w-5xl gap-4 sm:container">
      <Card>
        <CardContent className="flex h-full items-center justify-between gap-4 p-6 text-sm">
          <p className="text-md text-muted-foreground">
            You must be part of a team to view or edit team details.
          </p>
          <Link href={siteConfig.paths.join_team}>
            <Button variant="outline" className="w-32">
              Join a team
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
