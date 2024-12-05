"use client";
import { Badge } from "@/app/_components/ui/badge";
import { cn } from "@/app/_lib/client-utils";
import { Label } from "@radix-ui/react-label";
import React from "react";
import { Skeleton } from "../ui/skeleton";
import { type TChallengeData } from "@/server/dao/challenges";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Info } from "lucide-react";

type ChallengeContentInfo = {
  challengeData: TChallengeData;
  isSuccess: boolean;
};
export default function ChallengeContentInfo({
  challengeData,
  isSuccess,
}: ChallengeContentInfo) {
  if (isSuccess) {
    return (
      <div className="flex flex-col space-y-4 p-4">
        <div className="space-x-2">
          <Badge
            className={cn(
              "w-16 justify-center capitalize",
              challengeData?.challenge_difficulty == "easy"
                ? "bg-green-500 hover:bg-green-500/90"
                : challengeData?.challenge_difficulty == "medium"
                  ? "bg-primary hover:bg-primary/90"
                  : challengeData?.challenge_difficulty == "hard"
                    ? "bg-red-500 hover:bg-red-500/90"
                    : "",
            )}
          >
            {challengeData?.challenge_difficulty}
          </Badge>
          <Badge className="w-16 justify-center bg-foreground text-background hover:bg-foreground/90">
            {challengeData?.challenge_points}
          </Badge>
        </div>

        <h1 className="text-2xl">{challengeData?.challenge_title}</h1>
        <p className="whitespace-pre-line text-sm font-light">
          {challengeData?.challenge_description}
        </p>
        <Label className="flex items-center">
          <span>Input </span>
          <HoverCard openDelay={0} closeDelay={0}>
            <HoverCardTrigger asChild>
              <Info className="ml-2 h-4 w-4" />
            </HoverCardTrigger>
            <HoverCardContent className="text-sm font-normal">
              <span>
                Input and output syntax is standardized in Python. This does not
                represent exact inputs and outputs for other languages.
              </span>
            </HoverCardContent>
          </HoverCard>
        </Label>
        <pre className="word-break whitespace-pre-line break-words bg-background-variant font-mono">
          {challengeData?.challenge_example_input}
        </pre>
        <Label>Output</Label>
        <pre className="word-break whitespace-pre-line break-words bg-background-variant font-mono">
          {challengeData?.challenge_example_output}
        </pre>
        <Label>Explanation</Label>
        <p className="whitespace-pre-line text-sm font-light">
          {challengeData?.challenge_explanation}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4 p-4">
      <Skeleton className="h-[22px] w-16" />
      <Skeleton className="h-8" />
      <Skeleton className="h-5" />
      <Label>Input</Label>
      <Skeleton className="h-5" />
      <Label>Output</Label>
      <Skeleton className="h-5" />
      <Label>Explanation</Label>
      <Skeleton className="h-5 w-16" />
    </div>
  );
}
