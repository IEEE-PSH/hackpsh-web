import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { siteConfig } from "@/app/_config/site";
import { type Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Challenges | HackPSH",
  description: "Pick a challenge to solve to gain points!",
};

export default function ChallengesPage() {
  return (
    <div className="container my-4">
      <Card className="text-center">
        <CardHeader>
          <CardTitle>Internal Challenges Coming Soon!</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <p>
            For this event, we will be using Hackerrank to host software
            challenges. We are currently working on hosting our own coding
            problems for future events!
          </p>
          <p className="text-muted-foreground">
            Teams can use online resources to help them complete challenges.
            Teams are able to use AI (ex: ChatGPT), but may only receive half
            their total points earned in this category. This rule will be
            determined by the event administrators.
          </p>
          <Button className="px-4" asChild>
            <Link href={siteConfig.links.hackerrank} target="_blank">
              <span>Software Challenges</span>
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
