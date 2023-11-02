"use client";

import { type LeaderboardStandings } from "@/server/dao/leaderboard";
import DataTable from "./data-table";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function RealtimeLeaderboard({
  serverData,
}: {
  serverData: LeaderboardStandings;
}) {
  // const supabase = createClientComponentClient();

  // useEffect(() => {
  //   const channel = supabase.channel("leaderboard")
  //     .on('postgres_changes',
  //       {
  //         event: '*',
  //         schema: 'app_schema',
  //         table: 'app_team'
  //       },
  //       (payload) => console.log(payload)
  //     );

  //   channel.subscribe();
  //   return () => {
  //     supabase.removeChannel(channel)
  //   }
  // }, []);

  return <DataTable data={serverData} className="max-w-[55rem]" />;
}
