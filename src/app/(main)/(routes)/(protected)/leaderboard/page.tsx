import { type Metadata } from "next";
import Leaderboard from "@/app/_components/leaderboard/leaderboard";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Leaderboard | HackPSH",
  description: "See where your team stands amongst the competition.",
};

export default function LeaderboardPage() {
  return (
    <div>
      <div className="mt-14 flex w-full flex-col items-center justify-center">
        <p className="mb-10 text-center text-3xl font-bold tracking-tight">
          Leaderboard
        </p>
        <Leaderboard />
      </div>
    </div>
  );
}
