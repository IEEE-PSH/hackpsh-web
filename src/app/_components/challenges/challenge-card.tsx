"use client";
import { cn } from "@/app/_lib/client-utils";
import { Badge } from "../ui/badge";
import { type Challenge } from "@/server/dao/challenges";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/app/_config/site";
import { type TUserRole } from "@/db/drizzle/startup_seed";
import Link from "next/link";

type ChallengeCardProps = {
  challengeData: Challenge;
  challengesEnabled: boolean;
  userRole: TUserRole;
};

export default function ChallengeCard({
  challengeData,
  challengesEnabled,
  userRole,
}: ChallengeCardProps) {
  const {
    challenge_title,
    challenge_difficulty,
    challenge_id,
    challenge_points,
  } = challengeData;

  if(challengesEnabled || userRole!=="participant"){
    return(
      <Link
        href={siteConfig.paths.challenge + "/" + challenge_id}
        className="border-b last:border-0 transition-colors hover:bg-accent/50"
      >
        <ChallengeCardLink/>
      </Link>    
    )
  }else{
    return (
      <div className="border-b last:border-0">
        <ChallengeCardLink/>
      </div>
    )
  }
  
  function ChallengeCardLink(){ 
    return (
      <div className="flex flex-row items-center px-6 py-3">
        <h1 className="mr-4">{challenge_title}</h1>
        <div className="ml-auto flex items-center justify-center space-x-2">
          <Badge className="w-16 justify-center bg-foreground text-background hover:bg-foreground/90">
            {challenge_points}
          </Badge>
          <Badge
            className={cn(
              "w-16 justify-center bg-foreground capitalize text-foreground dark:text-background",
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
      </div>    
    )
  }
}
