import { serverTRPC } from "@/app/_trpc/server";
import RealtimeLeaderboard from "./realtime-leaderboard";

export default async function Leaderboard() {
  const data = await serverTRPC.leaderboard.get_current_standings.query();

  return (
    <RealtimeLeaderboard data={data} />
  )
}