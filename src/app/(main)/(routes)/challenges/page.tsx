import React from "react";
import ProtectedSiteHeader from "@/app/_components/nav/protected-site-header";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Challenges | HackPSH",
  description: "Pick a challenge to solve to gain points!",
}

export default function ChallengesPage() {
  return (
    <div>
      <ProtectedSiteHeader />
      <p className="m-10 text-3xl font-bold text-center">Challenges</p>
    </div>
  );
}
