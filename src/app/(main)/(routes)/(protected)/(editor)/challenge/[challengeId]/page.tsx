import ChallengeContentPage from "@/app/_components/challenges/challenge-content";
import ChallengeContextProvider, {
  type TUserData,
} from "@/app/_components/challenges/challenge-context-provider";
import EventUpdateNotifer from "@/app/_components/event/event-update-notifier";
import { serverTRPC } from "@/app/_trpc/server";
import { type TChallengeData } from "@/server/dao/challenges";
import { createClient } from "@/server/lib/supabase/server";
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
  const supabase = createClient();
  const user = await getUser(supabase);

  // fetch info server-side
  const userInfoQuery = await serverTRPC.user.get_user_info.query({
    user_uuid: user.id,
  });
  const { team_name } = await serverTRPC.user.get_user_team_info.query({
    user_uuid: user.id,
  });
  const challengeQuery = await serverTRPC.challenges.get_challenge.query({
    challenge_id: params.challengeId,
  });
  const solvedQuery = await serverTRPC.challenges.is_solved_challenge.query({
    challenge_id: params.challengeId,
    user_uuid: user.id,
  });

  // create objects to pass to context provider
  const userData: TUserData = { ...userInfoQuery, user_team_name: team_name };
  const challengeData: TChallengeData = challengeQuery;

  return (
    <ChallengeContextProvider
      userData={userData}
      challengeData={challengeData}
      isSolved={solvedQuery}
    >
      <EventUpdateNotifer />

      <div className="flex min-h-screen flex-grow flex-col bg-background">
        <ChallengeContentPage />
      </div>
    </ChallengeContextProvider>
  );
}
