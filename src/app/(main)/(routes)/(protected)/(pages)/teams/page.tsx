import { type Metadata } from "next";
import { serverTRPC } from "@/app/_trpc/server";
import { composeServerComponentClient } from "@/server/lib/supabase/server";
import { getUser } from "@/shared/supabase/auth";
import TeamsTable from "@/app/_components/teams/teams-table";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Leaderboard | HackPSH",
  description: "See where your team stands amongst the competition.",
};

export default async function LeaderboardPage() {
  const data = await serverTRPC.team.get_teams.query();

  const supabase = composeServerComponentClient();
  const user = await getUser(supabase);
  const userData = await serverTRPC.user.get_user_info.query({
    user_uuid: user.id,
  });

  return (
    <div className="container mb-4 max-w-5xl">
      <TeamsTable data={data} userData={userData} />
    </div>
  );
}
