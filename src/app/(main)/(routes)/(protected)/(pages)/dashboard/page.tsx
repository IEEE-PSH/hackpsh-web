import { MiniAnnouncements } from "@/app/_components/announcement/mini-announcements";
import ChallengeBooter from "@/app/_components/challenges/challenge-booter";
import { Challenges } from "@/app/_components/challenges/challenges";
import ChallengesProgress from "@/app/_components/challenges/challenges-progress";
import DashboardTeamInfo from "@/app/_components/dashboard/dashboard-team-info";
import { Card, CardContent, CardTitle } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { serverTRPC } from "@/app/_trpc/server";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { type TUserRole } from "@/db/drizzle/startup_seed";
import { composeServerComponentClient } from "@/server/lib/supabase/server";
import { getUser } from "@/shared/supabase/auth";
import { ChevronRight } from "lucide-react";
import { type Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Challenges | HackPSH",
  description: "Pick a challenge to solve to gain points!",
};

export default async function ChallengesPage() {
  const supabase = composeServerComponentClient();
  const user = await getUser(supabase);

  const challenges = await serverTRPC.challenges.get_challenges.query({
    user_uuid: user.id,
  });
  const is_challenges_enabled =
    await serverTRPC.event.is_challenges_enabled.query();
  const { get_user_role } = await serverTRPC.user.get_user_role.query({
    user_uuid: user.id,
  });

  if (
    challenges.solvedChallenges.length +
      challenges.unsolvedChallenges.length ===
    0
  ) {
    return (
      <p className="mx-auto text-center text-muted-foreground">
        No challenges yet.
      </p>
    );
  }

  return (
    <div className="container grid max-w-6xl grid-cols-1 gap-y-8">
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
        <MiniAnnouncements />
      </div>
    </div>
  );
}

function foo() {
  return (
    <Card>
      <CardContent className="grid grid-cols-1 p-6">
        <CardTitle className="text-md text-muted-foreground">Points</CardTitle>
        <p className="text-3xl font-semibold ">4500</p>
      </CardContent>
    </Card>
  );
}
