import { serverTRPC } from "@/app/_trpc/server";
import { composeServerComponentClient } from "@/server/lib/supabase/server";
import { getUser } from "@/shared/supabase/auth";
import { type TUserRole } from "@/db/drizzle/startup_seed";
import ChallengeCard from "@/app/_components/challenges/challenge-card";
import { Separator } from "../ui/separator";
import { type Challenges as TChallenges } from "@/server/dao/challenges";
import { Card } from "../ui/card";

export async function Challenges({ challenges }: { challenges: TChallenges }) {
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
      />,
    );
  });
  solvedChallenges.forEach((challengeData) => {
    solvedChallengeElements.push(
      <ChallengeCard
        key={challengeData.challenge_id}
        challengeData={challengeData}
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
          <Card className="mt-2 grid grid-cols-1">
            {unsolvedChallengeElements}
          </Card>
        ) : (
          <p className="text-muted-foreground">All challenges solved!</p>
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
          <div className="grid grid-cols-1 gap-4">
            <Card className="mt-2 grid grid-cols-1">
              {solvedChallengeElements}
            </Card>
          </div>
        ) : (
          <p className="ml-6 text-muted-foreground">
            No challenges solved yet.
          </p>
        )}
      </div>
    </div>
  );
}
