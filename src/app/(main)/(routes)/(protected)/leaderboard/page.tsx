import { type Metadata } from "next";
import RealtimeLeaderboard from "@/app/_components/leaderboard/realtime-leaderboard";
import { serverTRPC } from "@/app/_trpc/server";
import { composeServerComponentClient } from "@/server/lib/supabase/server";
import { getUser } from "@/shared/supabase/auth";
import { type TUserRole } from "@/db/drizzle/startup_seed";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Leaderboard | HackPSH",
  description: "See where your team stands amongst the competition.",
};

export default async function LeaderboardPage() {
  const data = await serverTRPC.leaderboard.get_current_standings.query();
  const supabase = composeServerComponentClient();
  const user = await getUser(supabase);

  const userData = await serverTRPC.user.get_user_info.query({
    user_uuid: user.id,
  });

  return (
    <div className="container max-w-5xl">
      <RealtimeLeaderboard serverData={data} userData={userData} />
    </div>
  );
}
