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
  const { team_name, team_join_code, team_total_points, team_members } =
    await serverTRPC.user.get_user_team_info.query({
      user_uuid: user.id,
    });

  return (
    <div className="container max-w-5xl">
      <Card>
        <CardHeader>
          <CardTitle className="">Welcome</CardTitle>
        </CardHeader>
        <CardContent className=""></CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="">Welcome</CardTitle>
        </CardHeader>
        <CardContent className=""></CardContent>
      </Card>
    </div>
  );
}
