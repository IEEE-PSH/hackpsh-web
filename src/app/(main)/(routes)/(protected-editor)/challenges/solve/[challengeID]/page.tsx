import ChallengePageContent from "@/app/_components/challenges/challenge-content";
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
  return (
    <div className="min-h-screen bg-background">
      <ChallengePageContent
        userDisplayName={user_display_name!}
        userEmailAddress={user_email_address!}
        challengeId={params.challengeId}
        userUUID={user.id}
      />
    </div>
  );
}
