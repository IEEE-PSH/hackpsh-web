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
    <div className="container grid max-w-5xl grid-cols-1 gap-y-8">
      <div className="grid gap-4 lg:grid-cols-2"></div>
    </div>
  );
}
