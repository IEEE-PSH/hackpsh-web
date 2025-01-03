"use client";

import { type LeaderboardStandings } from "@/server/dao/leaderboard";
import DataTable from "./data-table";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { type TUserInfo } from "@/server/dao/user";
import { createClient } from "@/app/_lib/supabase/client";

export default function RealtimeLeaderboard({
  serverData,
  userData,
}: {
  serverData: LeaderboardStandings;
  userData: TUserInfo;
}) {
  const supabase = createClient();
  const router = useRouter();

  //refresh route on app_team changes to update leaderboard ui
  //leaderboard does NOT subscribe to DELETE events because there
  //is currently an unknown error
  useEffect(() => {
    const channel = supabase
      .channel("leaderboard")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "app_schema",
          table: "app_team",
        },
        () => {
          router.refresh();
        },
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "app_schema",
          table: "app_team",
        },
        () => {
          router.refresh();
        },
      );

    channel.subscribe();
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      supabase.removeChannel(channel);
    };
  }, []);

  return <DataTable data={serverData} userData={userData} />;
}
