"use client";
import { cn } from "@/app/_lib/client-utils";
import { Badge } from "../ui/badge";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { type TUserRole } from "@/db/drizzle/startup_seed";
import { type Challenge } from "@/server/dao/challenges";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/app/_config/site";

type ChallengeCardProps = {
  challengeData: Challenge;
  userRole: TUserRole;
};

export default function ChallengeCard({
  challengeData,
  userRole,
}: ChallengeCardProps) {
  const {
    challenge_title,
    challenge_difficulty,
    challenge_id,
    challenge_points,
  } = challengeData;

  const router = useRouter();
  return (
    <Card
      className="cursor-pointer"
      onClick={() => {
        router.push(siteConfig.paths.solve + "/" + challenge_id);
      }}
    >
      <CardHeader className="flex flex-row items-center">
        <CardTitle className="mr-4 text-lg">{challenge_title}</CardTitle>
        <div className="ml-auto flex items-center justify-center space-x-2">
          <Badge className="w-16 justify-center bg-foreground text-background hover:bg-foreground/90">
            {challenge_points}
          </Badge>
          <Badge
            className={cn(
              "w-16 justify-center bg-foreground capitalize text-background ",
              challenge_difficulty == "easy"
                ? "bg-green-500 hover:bg-green-500/90"
                : challenge_difficulty == "medium"
                  ? "bg-primary hover:bg-primary/90"
                  : challenge_difficulty == "hard"
                    ? "bg-red-500 hover:bg-red-500/90"
                    : "",
            )}
          >
            {challenge_difficulty}
          </Badge>
        </div>
      </CardHeader>
    </Card>
  );
}
