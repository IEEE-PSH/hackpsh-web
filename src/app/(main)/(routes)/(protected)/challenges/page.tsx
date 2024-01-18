import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Challenges | HackPSH",
  description: "Pick a challenge to solve to gain points!",
};

export default function ChallengesPage() {
  return (
    <div>
      <div className="mt-14 flex w-full flex-col items-center justify-center">
        <p className="mb-10 text-center text-3xl font-bold tracking-tight">
          Challenges
        </p>
      </div>
    </div>
  );
}
