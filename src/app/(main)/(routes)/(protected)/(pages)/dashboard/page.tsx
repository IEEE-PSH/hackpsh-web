import { MiniAnnouncements } from "@/app/_components/announcement/mini-announcements";
import { Challenges } from "@/app/_components/challenges/challenges";
import ChallengesProgress from "@/app/_components/challenges/challenges-progress";
import DashboardTeamInfo from "@/app/_components/dashboard/dashboard-team-info";
import { cn } from "@/app/_lib/client-utils";
import { serverTRPC } from "@/app/_trpc/server";
import { type TUserRole } from "@/db/drizzle/startup_seed";
import { createClient } from "@/server/lib/supabase/server";
import { getUser } from "@/shared/supabase/auth";
import { type Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard | HackPSH",
  description: "View challenges and your team information.",
};

export default async function ChallengesPage() {
  const supabase = createClient();
  const user = await getUser(supabase);

  const challenges = await serverTRPC.challenges.get_challenges.query({
    user_uuid: user.id,
  });
  const is_challenges_enabled =
    await serverTRPC.event.is_challenges_enabled.query();
  const { get_user_role } = await serverTRPC.user.get_user_role.query({
    user_uuid: user.id,
  });

  const challengeCount =
    challenges.solvedChallenges.length + challenges.unsolvedChallenges.length;

  return (
    <div
      className={cn(
        challengeCount > 0 ? "gap-y-8" : "gap-y-4",
        "container grid max-w-6xl grid-cols-1",
      )}
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <DashboardTeamInfo />
        <ChallengesProgress challenges={challenges} />
      </div>
      <div className="flex gap-4">
        <Challenges
          challenges={challenges}
          challengesEnabled={is_challenges_enabled}
          userRole={get_user_role as TUserRole}
        />
        <MiniAnnouncements className={challengeCount > 0 ? "mt-8" : ""} />
      </div>
    </div>
  );
}
