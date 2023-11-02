import { type Metadata } from "next";
import ProtectedSiteHeader from "@/app/_components/nav/protected-site-header";
import Leaderboard from "@/app/_components/leaderboard/leaderboard";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Leaderboard | HackPSH",
  description: "See where your team stands amongst the competition.",
}

export default async function LeaderboardPage() {
  return (
    <div>
      <ProtectedSiteHeader />
      <div className="flex flex-col items-center justify-center w-full mt-14">
        <p className="mb-10 text-3xl font-bold tracking-tight text-center">
          Leaderboard
        </p>
        <Leaderboard />
      </div>
    </div>
  );
}
