import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { siteConfig } from "@/app/_config/site";
import { cn } from "@/app/_lib/client-utils";
import { Check } from "lucide-react";
import { type Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Challenges | HackPSH",
  description: "Pick a challenge to solve to gain points!",
};

export default function ChallengesPage() {
  return (
    <div className="container my-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChallengeCard title={"Sum of Array"} difficulty={"Easy"} />
        <ChallengeCard title={"Fibonacci"} difficulty={"Easy"} />
        <ChallengeCard title={"Sum of Array"} difficulty={"Easy"} />
        <ChallengeCard title={"Sum of Array"} difficulty={"Easy"} />
        <ChallengeCard title={"Sum of Array"} difficulty={"Easy"} />
        <ChallengeCard title={"Sum of Array"} difficulty={"Easy"} />
        <ChallengeCard title={"Sum of Array"} difficulty={"Medium"} />
        <ChallengeCard title={"Sum of Array"} difficulty={"Medium"} />
        <ChallengeCard title={"Sum of Array"} difficulty={"Medium"} />
        <ChallengeCard title={"Sum of Array"} difficulty={"Medium"} />
        <ChallengeCard title={"Sum of Array"} difficulty={"Hard"} />
        <ChallengeCard title={"Sum of Array"} difficulty={"Hard"} />
      </div>
    </div>
  );
}

function ChallengeCard({ title, difficulty }: challengeCardProps) {
  return (
    <Card className="cursor-pointer">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        {true ? (
          <Badge
            className={cn(
              "w-16 justify-center",
              difficulty == "Easy"
                ? "bg-green-500 hover:bg-green-500/90"
                : difficulty == "Medium"
                  ? "bg-primary hover:bg-primary/90"
                  : difficulty == "Hard"
                    ? "bg-red-500 hover:bg-red-500/90"
                    : "",
            )}
          >
            {difficulty}
          </Badge>
        ) : (
          <Check />
        )}
      </CardHeader>
    </Card>
  );
}

type challengeCardProps = {
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
};
