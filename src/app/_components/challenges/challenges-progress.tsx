import { Card, CardContent, CardTitle } from "@/app/_components/ui/card";
import { Progress } from "@/app/_components/ui/progress";
import { type Challenges } from "@/server/dao/challenges";
import React from "react";

export default async function ChallengesProgress({
  challenges,
}: {
  challenges: Challenges;
}) {
  const difficultyCount = {
    unsolved: {
      easy: challenges.unsolvedChallenges.filter(
        (challenge) => challenge.challenge_difficulty === "easy",
      ).length,
      medium: challenges.unsolvedChallenges.filter(
        (challenge) => challenge.challenge_difficulty === "medium",
      ).length,
      hard: challenges.unsolvedChallenges.filter(
        (challenge) => challenge.challenge_difficulty === "hard",
      ).length,
    },
    solved: {
      easy: challenges.solvedChallenges.filter(
        (challenge) => challenge.challenge_difficulty === "easy",
      ).length,
      medium: challenges.solvedChallenges.filter(
        (challenge) => challenge.challenge_difficulty === "medium",
      ).length,
      hard: challenges.solvedChallenges.filter(
        (challenge) => challenge.challenge_difficulty === "hard",
      ).length,
    },
  };

  const totalCount = {
    easy: difficultyCount.solved.easy + difficultyCount.unsolved.easy,
    medium: difficultyCount.solved.medium + difficultyCount.unsolved.medium,
    hard: difficultyCount.solved.hard + difficultyCount.unsolved.hard,
  };

  return (
    <Card>
      <CardContent className="grid grid-cols-1 p-6">
        <div>
          <div className="flex items-center justify-between space-x-4">
            <p>
              Easy{" "}
              <span className="text-muted-foreground">
                ({difficultyCount.solved.easy}/{totalCount.easy})
              </span>
            </p>
            <Progress
              value={(difficultyCount.solved.easy / totalCount.easy) * 100}
              className="col-span-5 h-2 w-3/5"
              indicatorColor="bg-foreground"
            />
          </div>
          <div className="flex items-center justify-between space-x-4">
            <p>
              Medium{" "}
              <span className="text-muted-foreground">
                ({difficultyCount.solved.medium}/{totalCount.medium})
              </span>
            </p>
            <Progress
              value={(difficultyCount.solved.medium / totalCount.medium) * 100}
              className="col-span-5 h-2 w-3/5"
              indicatorColor="bg-foreground"
            />
          </div>
          <div className="flex items-center justify-between space-x-4">
            <p>
              Hard{" "}
              <span className="text-muted-foreground">
                ({difficultyCount.solved.hard}/{totalCount.hard})
              </span>
            </p>
            <Progress
              value={(difficultyCount.solved.hard / totalCount.hard) * 100}
              className="col-span-5 h-2 w-3/5"
              indicatorColor="bg-foreground"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
