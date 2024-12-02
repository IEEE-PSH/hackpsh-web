import { EditChallengeForm } from "@/app/_components/forms/edit-challenge-form";
import { serverTRPC } from "@/app/_trpc/server";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Challenge | HackPSH",
  description: "Create a challenge for the event.",
};

export default async function EditChallengePage({
  params,
}: {
  params: { challengeId: number };
}) {
  const challengeData =
    await serverTRPC.challenges.get_edit_challenge_info.query({
      challenge_id: params.challengeId,
    });
  return (
    <div className="container mt-8 max-w-4xl">
      <EditChallengeForm challengeData={challengeData} />
    </div>
  );
}
