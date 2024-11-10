import ChallengeBooter from "@/app/_components/challenges/challenge-booter";
import ChallengeContentPage from "@/app/_components/challenges/challenge-content";
import ChallengeSyncer from "@/app/_components/challenges/challenge-syncer";
import { serverTRPC } from "@/app/_trpc/server";
import { composeServerComponentClient } from "@/server/lib/supabase/server";
import { getUser } from "@/shared/supabase/auth";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Challenge | HackPSH",
  description: "Run and submit your code.",
};

export default async function ChallengePage({
  params,
}: {
  params: {
    challengeId: number;
  };
}) {
  const supabase = composeServerComponentClient();
  const user = await getUser(supabase);

  const { user_display_name, user_email_address, user_team_uuid, user_uuid } =
    await serverTRPC.user.get_user_info.query({ user_uuid: user.id });

  let teamName: string | null = null;

  if (user_team_uuid) {
    const teamInfo = await serverTRPC.user.get_user_team_info.query({
      user_uuid: user.id,
    });
    teamName = teamInfo?.team_name ?? null;
  }

  const challengeData = await serverTRPC.challenges.get_challenge.query({
    challenge_id: params.challengeId,
  });

  const isSolved = await serverTRPC.challenges.is_solved_challenge.query({
    challenge_id: challengeData!.challenge_id,
    user_uuid: user_uuid,
  });

  return (
    <>
      <ChallengeBooter />

      <div className="min-h-screen bg-background">
        <ChallengeContentPage
          userDisplayName={user_display_name!}
          userEmailAddress={user_email_address}
          challengeData={challengeData}
          userUUID={user.id}
          teamName={teamName}
          isSolved={isSolved}
        />
      </div>
    </>
  );
}
