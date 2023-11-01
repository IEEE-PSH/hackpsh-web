import { LeaderboardStandings } from "@/server/dao/leaderboard";
import DataTable from "./data-table";

export default async function RealtimeLeaderboard({ data }: { data: LeaderboardStandings }) {
  return (
    <DataTable data={data} className="max-w-[55rem]" />
  )
}