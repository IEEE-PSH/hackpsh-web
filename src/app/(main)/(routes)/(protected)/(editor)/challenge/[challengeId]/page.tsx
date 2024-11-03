import ChallengeContentPage from "@/app/_components/challenges/challenge-content";
import { serverTRPC } from "@/app/_trpc/server";
import { composeServerComponentClient } from "@/server/lib/supabase/server";
import { getUser } from "@/shared/supabase/auth";

export default async function ChallengePage({
  params,
}: {
  params: {
    challengeId: number;
  };
}) {
  const supabase = composeServerComponentClient();
  const user = await getUser(supabase);

  const { user_display_name, user_email_address, user_team_uuid } =
    await serverTRPC.user.get_user_info.query({ user_uuid: user.id });

  let teamName: string | null = null;

  if (user_team_uuid) {
    const teamInfo = await serverTRPC.user.get_user_team_info.query({
      user_uuid: user.id,
    });
    teamName = teamInfo?.team_name ?? null;
  }

  return (
    <div className="min-h-screen bg-background">
      <ChallengeContentPage
        userDisplayName={user_display_name!}
        userEmailAddress={user_email_address}
        challengeId={params.challengeId}
        userUUID={user.id}
        teamName={teamName}
      />
    </div>
  );
}
