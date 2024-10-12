import { EditChallengeForm } from "@/app/_components/forms/edit-challenge-form";
import { serverTRPC } from "@/app/_trpc/server";
import { composeServerComponentClient } from "@/server/lib/supabase/server";
import { getUser } from "@/shared/supabase/auth";
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
  const supabase = composeServerComponentClient();
  const user = await getUser(supabase);

  const challengeData =
    await serverTRPC.challenges.get_edit_challenge_info.query({
      challenge_id: params.challengeId,
    });
  return (
    <div className="container my-4 mt-8 max-w-4xl">
      <EditChallengeForm challengeData={challengeData} userUUID={user.id} />
    </div>
  );
}
