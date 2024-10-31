import { CreateChallengeForm } from "@/app/_components/forms/create-challenge-form";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Challenge | HackPSH",
  description: "Create a challenge for the event.",
};

export default function CreateChallengePage() {
  return (
    <div className="container mt-8 max-w-4xl">
      <CreateChallengeForm />
    </div>
  );
}
