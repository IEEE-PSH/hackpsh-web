import { type Metadata } from "next";
import RealtimeLeaderboard from "@/app/_components/leaderboard/realtime-leaderboard";
import { serverTRPC } from "@/app/_trpc/server";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Leaderboard | HackPSH",
  description: "See where your team stands amongst the competition.",
};

export default async function LeaderboardPage() {
  const data = await serverTRPC.leaderboard.get_current_standings.query();
  return (
    <div className="container flex w-full flex-col items-center justify-center">
      <RealtimeLeaderboard serverData={data} />
    </div>
  );
}
