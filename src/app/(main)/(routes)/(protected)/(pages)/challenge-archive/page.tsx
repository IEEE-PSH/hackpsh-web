import ArchivedChallenges from "@/app/_components/challenges/archived-challenges";
import { Card, CardContent } from "@/app/_components/ui/card";
import { serverTRPC } from "@/app/_trpc/server";
import { type Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard | HackPSH",
  description: "View challenges and your team information.",
};

export default async function ChallengesPage() {
  const challenges = await serverTRPC.challenges.get_archived_challenges.query();

  return (
    <div className="container grid max-w-6xl grid-cols-1 gap-y-8">
      <Card>
        <CardContent className="p-6">
          <h1 className="font-semibold tracking-tight text-xl">Welcome to the Challenge Archive</h1>
          <p className="text-sm">These are challenges that have been used in past events and are currently not being used. 
            You can still run and test them, but they will not give you any points. It is possible for some of these challenges to appear 
            in the next event.
            </p>
        </CardContent>
      </Card>

      <ArchivedChallenges challenges={challenges}/>
    </div>
  );
}
