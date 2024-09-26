"use client";

import { type LeaderboardStandings } from "@/server/dao/leaderboard";
import DataTable from "./data-table";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { TUserInfo } from "@/server/dao/user";

export default function RealtimeLeaderboard({
  serverData,
  userData,
}: {
  serverData: LeaderboardStandings;
  userData: TUserInfo;
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
      () => {
        //refresh route on app_team changes to update leaderboard ui
        router.refresh();
      },
    );

    channel.subscribe();
    // return () => {
    //   supabase.removeChannel(channel)
    // }
  }, []);

  return <DataTable data={serverData} userData={userData} />;
}
