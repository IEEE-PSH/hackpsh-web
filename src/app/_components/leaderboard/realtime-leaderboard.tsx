"use client";

import { type LeaderboardStandings } from "@/server/dao/leaderboard";
import DataTable from "./data-table";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RealtimeLeaderboard({
  serverData,
}: {
  serverData: LeaderboardStandings;
}) {
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const channel = supabase.channel("leaderboard").on(
      "postgres_changes",
      {
        event: "*",
        schema: "app_schema",
        table: "app_team",
      },
      (payload) => {
        //refresh route on app_team changes to update leaderboard ui
        router.refresh();
      },
    );

    channel.subscribe();
    // return () => {
    //   supabase.removeChannel(channel)
    // }
  }, []);

  return <DataTable data={serverData} className="max-w-4xl" />;
}
