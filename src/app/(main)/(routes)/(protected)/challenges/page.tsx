import { Challenges } from "@/app/_components/challenges/challenges";
import { type Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Challenges | HackPSH",
  description: "Pick a challenge to solve to gain points!",
};

export default function ChallengesPage() {
  return (
    <div className="my-4 container"><Challenges/></div>
    
  )
}
