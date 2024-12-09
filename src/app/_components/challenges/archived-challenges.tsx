"use client";
import { cn } from "@/app/_lib/client-utils";
import { Badge } from "../ui/badge";
import { type TArchivedChallenges} from "@/server/dao/challenges";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/app/_config/site";
import { Card } from "../ui/card";

export default function ArchivedChallenges({
  challenges
}: {challenges:TArchivedChallenges}) {
  const router = useRouter();
  const challengeElements = []
  for (const challenge of challenges){
    challengeElements.push(
      <div
      className="cursor-pointer border-b transition-colors last:border-0 hover:bg-accent/50"
      onClick={() => {
          router.push(siteConfig.paths.challenge + "/" + challenge.challenge_id);
      }}
    >
      <div className="flex flex-row items-center px-6 py-3">
        <h1 className="mr-4">{challenge.challenge_title}</h1>
        <div className="ml-auto flex items-center justify-center space-x-2">
          <Badge className="w-16 justify-center bg-foreground text-background hover:bg-foreground/90">
            {challenge.challenge_points}
          </Badge>
          <Badge
            className={cn(
              "w-16 justify-center bg-foreground capitalize text-background ",
              challenge.challenge_difficulty == "easy"
                ? "bg-green-500 hover:bg-green-500/90"
                : challenge.challenge_difficulty == "medium"
                  ? "bg-primary hover:bg-primary/90"
                  : challenge.challenge_difficulty == "hard"
                    ? "bg-red-500 hover:bg-red-500/90"
                    : "",
            )}
          >
            {challenge.challenge_difficulty}
          </Badge>
        </div>
      </div>
    </div>
    )
  }

  if (challengeElements.length>0){
    return(
      <Card className="w-full">
        <div>
          {challengeElements}
        </div>
      </Card> 
    )
  }else{
    return(
      <p className="mx-auto text-center text-muted-foreground">
        No archived challenges yet.
      </p>      
    )
  }
}
