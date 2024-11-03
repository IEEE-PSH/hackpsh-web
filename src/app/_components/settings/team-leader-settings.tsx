import { serverTRPC } from "@/app/_trpc/server";
import TeamSettingsForm from "../forms/team-settings-form";
import TeamLeaveDialog from "../teams/team-leave-dialog";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import DeleteSelfTeamDialog from "./delete-self-team-dialog";

//these are the team settings for the team leader
export default async function TeamLeaderSettings({
  userUUID,
}: {
  userUUID: string;
}) {
  const teamData = await serverTRPC.user.get_user_team_info.query({
    user_uuid: userUUID,
  });

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
                  <span className="mr-auto">{member.user_display_name}</span>
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
            <TeamLeaveDialog userUUID={userUUID} />
          </div>
          <div className="mt-6 flex flex-col justify-between space-y-4 sm:flex-row md:space-x-4">
            <div className="flex flex-col space-y-2">
              <Label>Delete your team</Label>
              <p className="text-sm text-muted-foreground">
                You can delete your team. This will kick all members from the
                team.
              </p>
            </div>
            <DeleteSelfTeamDialog />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
