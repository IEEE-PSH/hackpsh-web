import ChallengeCard from "@/app/_components/challenges/challenge-card";
import { type Challenges as TChallenges } from "@/server/dao/challenges";
import { Card } from "../ui/card";
import { type TUserRole } from "@/db/drizzle/startup_seed";
import { cn } from "@/app/_lib/client-utils";
import ChallengeBooter from "./challenge-booter";

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
  const difficultyOrder: Record<string, number> = {
    easy: 1,
    medium: 2,
    hard: 3,
  };
  unsolvedChallenges = unsolvedChallenges.sort(
    (a, b) =>
      difficultyOrder[a.challenge_difficulty]! -
      difficultyOrder[b.challenge_difficulty]!,
  );
  solvedChallenges = solvedChallenges.sort(
    (a, b) =>
      difficultyOrder[a.challenge_difficulty]! -
      difficultyOrder[b.challenge_difficulty]!,
  );

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

  return (
    <div className="grid grid-cols-1 gap-8">
      <div>
        <p className="ml-6">
          Unsolved{" "}
          <span className="font-normal text-muted-foreground">
            ({unsolvedChallenges.length}/{totalChallenges})
          </span>
        </p>
        {unsolvedChallenges.length > 0 ? (
          <Card className="relative mt-2">
            {!challengesEnabled && (
              <div
                className={cn(
                  userRole !== "participant" && "pointer-events-none",
                  "absolute z-[50] flex h-full w-full items-center justify-center bg-background/80",
                )}
              />
            )}

            <div className={cn("grid grid-cols-1")}>
              {unsolvedChallengeElements}
            </div>
          </Card>
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
        ) : (
          <p className="ml-6 text-muted-foreground">
            No challenges solved yet.
          </p>
        )}
      </div>
    </div>
  );
}
