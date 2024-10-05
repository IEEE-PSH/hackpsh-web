import { serverTRPC } from "@/app/_trpc/server";
import { composeServerComponentClient } from "@/server/lib/supabase/server";
import { getUser } from "@/shared/supabase/auth";
import { type TUserRole } from "@/db/drizzle/startup_seed";
import ChallengeCard from "@/app/_components/challenges/challenge-card";

export async function Challenges() {
  const serverChallenges = await serverTRPC.challenges.get_challenges.query();

  const supabase = composeServerComponentClient();
  const user = await getUser(supabase);
  const { get_user_role } = await serverTRPC.user.get_user_role.query({
    user_uuid: user.id,
  });

  const challengeElements: JSX.Element[] = [];

  serverChallenges.forEach((challengeData) => {
    challengeElements.push(
      <ChallengeCard
        key={challengeData.challenge_id}
        challengeData={challengeData}
        userRole={get_user_role as unknown as TUserRole}
      />,
    );
  });

  if (challengeElements.length > 0) {
    return <div className="grid grid-cols-1 gap-4">{challengeElements}</div>;
  } else
    return (
      <p className="mx-auto text-center text-muted-foreground">
        No challenges yet.
      </p>
    );
}
