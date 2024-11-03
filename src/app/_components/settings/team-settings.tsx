import { serverTRPC } from "@/app/_trpc/server";
import TeamSettingsForm from "../forms/team-settings-form";
import TeamLeaveDialog from "../teams/team-leave-dialog";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import DeleteSelfTeamDialog from "./delete-self-team-dialog";
import TeamPromoteUserDialog from "./team-promote-user-dialog";
import TeamKickUserDialog from "./team-kick-user-dialog";

export default async function TeamSettings({
  userUUID,
  isTeamLeader,
}: {
  userUUID: string;
  isTeamLeader: boolean;
}) {
  const teamData = await serverTRPC.user.get_user_team_info.query({
    user_uuid: userUUID,
  });

  return (
    <div className="grid max-w-5xl gap-4 sm:container">
      <Card className="border-0 sm:border">
        <CardContent className="p-8">
          <TeamSettingsForm teamData={teamData} isTeamLeader={isTeamLeader} />
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
                    {member.user_display_name}{" "}
                    {member.user_team_leader && <span>(Team Leader)</span>}
                  </span>
                  {isTeamLeader && member.user_uuid !== userUUID && (
                    <>
                      <TeamPromoteUserDialog
                        userUUID={userUUID}
                        targetUUID={member.user_uuid}
                      />
                      <TeamKickUserDialog targetUUID={member.user_uuid} />
                    </>
                  )}
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
          {isTeamLeader && (
            <div className="mt-6 flex flex-col justify-between space-y-4 sm:flex-row md:space-x-4">
              <div className="flex flex-col space-y-2">
                <Label>Delete your team</Label>
                <p className="text-sm text-muted-foreground">
                  You can delete your team. This will kick all members from the
                  team.
                </p>
              </div>
              <DeleteSelfTeamDialog userUUID={userUUID} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
