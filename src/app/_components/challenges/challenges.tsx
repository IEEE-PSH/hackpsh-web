import ChallengeCard from "@/app/_components/challenges/challenge-card";
import { type Challenges as TChallenges } from "@/server/dao/challenges";
import { Card, CardContent } from "../ui/card";
import { type TUserRole } from "@/db/drizzle/startup_seed";
import { cn } from "@/app/_lib/client-utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import { siteConfig } from "@/app/_config/site";
import Link from "next/link";

export const difficultyOrder: Record<string, number> = {
  easy: 1,
  medium: 2,
  hard: 3,
};

export function Challenges({
  challenges,
  challengesEnabled,
  userRole,
}: {
  challenges: TChallenges;
  challengesEnabled: boolean;
  userRole: TUserRole;
}) {
  let { unsolvedChallenges, solvedChallenges } = challenges;

  //sort challenges
  unsolvedChallenges = unsolvedChallenges.sort((a, b) => {
    const comparison =
      difficultyOrder[a.challenge_difficulty]! -
      difficultyOrder[b.challenge_difficulty]!;
    if (comparison != 0) return comparison;
    return a.challenge_points - b.challenge_points;
  });
  solvedChallenges = solvedChallenges.sort((a, b) => {
    const comparison =
      difficultyOrder[a.challenge_difficulty]! -
      difficultyOrder[b.challenge_difficulty]!;
    if (comparison != 0) return comparison;
    return a.challenge_points - b.challenge_points;
  });

  //populate challengeElements
  const unsolvedChallengeElements: JSX.Element[] = [];
  const solvedChallengeElements: JSX.Element[] = [];

  unsolvedChallenges.forEach((challengeData) => {
    unsolvedChallengeElements.push(
      <ChallengeCard
        key={challengeData.challenge_id}
        challengeData={challengeData}
        challengesEnabled={challengesEnabled}
        userRole={userRole}
      />,
    );
  });
  solvedChallenges.forEach((challengeData) => {
    solvedChallengeElements.push(
      <ChallengeCard
        key={challengeData.challenge_id}
        challengeData={challengeData}
        challengesEnabled={challengesEnabled}
        userRole={userRole}
      />,
    );
  });

  const totalChallenges = solvedChallenges.length + unsolvedChallenges.length;

  if (totalChallenges===0){
    return(
      <Card className="w-full mt-0 self-start">
        <CardContent className="p-6 text-center">
          <h1 className="font-semibold tracking-tight text-lg">No challenges yet</h1>
          <p className="text-sm">You can visit the Challenge Archive to view past challenges.</p>
          <Button className="mt-4 ml-auto" asChild>
            <Link href={siteConfig.paths.challenge_archive}>
              Visit Challenge Archive
            </Link>
          </Button>
        </CardContent>
      </Card>
    )
  }



  return (
    <div className="flex w-full flex-col gap-8">
      <div>
        <p className="ml-6">
          Unsolved{" "}
          <span className="font-normal text-muted-foreground">
            ({unsolvedChallenges.length}/{totalChallenges})
          </span>
        </p>
        {unsolvedChallenges.length > 0 ? (
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Card className="relative mt-2">
                  {!challengesEnabled && (
                    <div
                      className={cn(
                        userRole !== "participant" && "pointer-events-none",
                        "absolute z-[50] flex h-full w-full items-center justify-center bg-background/80",
                      )}
                    ></div>
                  )}
                  <div className={cn("grid grid-cols-1")}>
                    {unsolvedChallengeElements}
                  </div>
                </Card>
              </TooltipTrigger>
              {!challengesEnabled && (
                <TooltipContent className="mr-4 w-auto p-2" side="top">
                  <p className="text-sm">
                    {userRole === "participant"
                      ? "Challenges are currently disabled for participants."
                      : "Challenges are currently disabled, but you can still view and edit them."}
                  </p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        ) : (
          <p className="ml-6 text-muted-foreground">All challenges solved!</p>
        )}
      </div>

      <div>
        <p className="ml-6">
          Solved{" "}
          <span className="font-normal text-muted-foreground">
            ({solvedChallenges.length}/{totalChallenges})
          </span>
        </p>
        {solvedChallenges.length > 0 ? (
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Card className="relative mt-2">
                  {!challengesEnabled && (
                    <div
                      className={cn(
                        userRole !== "participant" && "pointer-events-none",
                        "absolute z-[50] flex h-full w-full items-center justify-center bg-background/80",
                      )}
                    ></div>
                  )}
                  <div className={cn("grid grid-cols-1")}>
                    {solvedChallengeElements}
                  </div>
                </Card>
              </TooltipTrigger>
              {!challengesEnabled && (
                <TooltipContent className="mr-4 w-auto p-2" side="top">
                  <p className="text-sm">
                    {userRole === "participant"
                      ? "Challenges are currently disabled for participants."
                      : "Challenges are currently disabled, but you can still view and edit them."}
                  </p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        ) : (
          <p className="ml-6 text-muted-foreground">
            No challenges solved yet.
          </p>
        )}
      </div>
    </div>
  );
}
