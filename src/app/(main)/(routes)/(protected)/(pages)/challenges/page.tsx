import ChallengeCard from "@/app/_components/challenges/challenge-card";
import { Challenges } from "@/app/_components/challenges/challenges";
import ChallengesProgress from "@/app/_components/challenges/challenges-progress";
import { Card, CardContent, CardTitle } from "@/app/_components/ui/card";
import { Progress } from "@/app/_components/ui/progress";
import { serverTRPC } from "@/app/_trpc/server";
import { composeServerComponentClient } from "@/server/lib/supabase/server";
import { getUser } from "@/shared/supabase/auth";
import { type Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Challenges | HackPSH",
  description: "Pick a challenge to solve to gain points!",
};

export default async function ChallengesPage() {
  const supabase = composeServerComponentClient();
  const user = await getUser(supabase);

  let challenges = await serverTRPC.challenges.get_challenges.query({
    user_uuid: user.id,
  });
  let { team_name, team_total_points } =
    await serverTRPC.user.get_user_team_info.query({
      user_uuid: user.id,
    });

  return (
    <div className="container my-4 grid max-w-5xl grid-cols-1 gap-y-8">
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardContent className="grid grid-cols-1 p-6">
            <CardTitle className="text-md text-muted-foreground">
              {team_name}
            </CardTitle>
            <p className="text-3xl font-semibold ">
              {team_total_points} Points
            </p>
          </CardContent>
        </Card>
        <ChallengesProgress challenges={challenges} />
      </div>

      <Challenges challenges={challenges} />
    </div>
  );
}
