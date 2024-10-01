import { cn } from "@/app/_lib/client-utils";
import { Badge } from "../ui/badge";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { Check } from "lucide-react";
import { type TUserRole } from "@/db/drizzle/startup_seed";
import { type Challenge } from "@/server/dao/challenges";

type ChallengeCardProps = {
    key: number;
    challengeData: Challenge;
    userRole: TUserRole;
  };
  

export default function ChallengeCard({ key, challengeData, userRole }: ChallengeCardProps) {
    const {challenge_title, challenge_difficulty, challenge_id} = challengeData
    
    return (
      <Card className="cursor-pointer" key={`challenge-${key}`}>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{challenge_title}</CardTitle>
          {true ? (
            <Badge
              className={cn(
                "w-16 justify-center capitalize",
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
          ) : (
            <Check />
          )}
        </CardHeader>
      </Card>
    );
  }
