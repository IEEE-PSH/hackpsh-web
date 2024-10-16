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
  const { user_display_name, user_email_address } =
    await serverTRPC.user.get_user_dropdown_info.query({
      user_uuid: user.id,
    });
  const { team_name } = await serverTRPC.user.get_user_team_info.query({
    user_uuid: user.id,
  });
  return (
    <div className="min-h-screen bg-background">
      <ChallengeContentPage
        userDisplayName={user_display_name!}
        userEmailAddress={user_email_address!}
        challengeId={params.challengeId}
        userUUID={user.id}
        teamName={team_name!}
      />
    </div>
  );
}
