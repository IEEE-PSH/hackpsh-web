"use client";
import { cn } from "@/app/_lib/client-utils";
import { Badge } from "../ui/badge";
import { type TArchivedChallenges} from "@/server/dao/challenges";
import { siteConfig } from "@/app/_config/site";
import { Card } from "../ui/card";
import { difficultyOrder } from "./challenges";
import Link from "next/link";

export default function ArchivedChallenges({
  challenges
}: {challenges:TArchivedChallenges}) {
  const challengeElements = []

  challenges.sort((a, b) => {
    const comparison =
      difficultyOrder[a.challenge_difficulty]! -
      difficultyOrder[b.challenge_difficulty]!;
    if (comparison != 0) return comparison;
    return a.challenge_points - b.challenge_points;
  });
  
  for (let i=0; i<challenges.length; i++){
    const challenge = challenges[i]!
    challengeElements.push(
      <Link href={siteConfig.paths.challenge + "/" + challenge.challenge_id} key={`challenge-${challenge.challenge_id}`} 
        className={cn(i===challenges.length-2 && i%2==0 ? "border-b lg:border-b-0" : "border-b last:border-b-0",
         "border-r-0 lg:border-r")}>
        <div className="transition-colors hover:bg-accent/50">
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
    </Link>
    )
  }

  if (challengeElements.length>0){
    return(
        <Card className="grid lg:grid-cols-2">
          {challengeElements}
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
