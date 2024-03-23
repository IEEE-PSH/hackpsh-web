import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { serverTRPC } from "@/app/_trpc/server";
import { composeServerComponentClient } from "@/server/lib/supabase/server";
import { getUser } from "@/shared/supabase/auth";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | HackPSH",
  description: "Overview your progress within the competition.",
};

export default async function DashboardPage() {
  const supabase = composeServerComponentClient();

  const user = await getUser(supabase);
  const { team_name, team_join_code, team_points, team_members } =
    await serverTRPC.team.get_team_info.query({
      user_uuid: user.id,
    });

  return (
    <div className="container my-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl">Team</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4 text-muted-foreground">
          <div>
            <p className="text-xl text-foreground">General Information</p>
            <p>Team Name: {team_name}</p>
            <p>Team Code: {team_join_code}</p>
            <p>Points: {team_points}</p>
          </div>

          <div>
            <p className="text-xl text-foreground">Members</p>
            {team_members.map((member, index) => (
              <p key={`member-${index}`} className="text-muted-foreground">
                {member.user_display_name}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
