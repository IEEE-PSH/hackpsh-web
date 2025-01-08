"use client";
import { trpc } from "@/app/_trpc/react";
import { type Dispatch, type SetStateAction, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import { type TLanguages } from "@/server/zod-schemas/challenges";
import { createClient } from "@/app/_lib/supabase/client";
import { useChallenge } from "./challenge-context-provider";

export default function ChallengeSyncer({
  setSolved,
  setValue,
  setLanguage,
}: {
  setSolved: Dispatch<SetStateAction<boolean>>;
  setValue: Dispatch<SetStateAction<string>>;
  setLanguage: Dispatch<SetStateAction<TLanguages>>;
}) {
  const { userData, challengeData, isSolved } = useChallenge();
  const router = useRouter();
  const supabase = createClient();

  //manually check if solved; notify all clients
  const { refetch: checkSolved } = trpc.challenges.is_solved_challenge.useQuery(
    {
      challenge_id: challengeData?.challenge_id,
      user_uuid: userData?.user_uuid,
    },
    { enabled: false },
  );

  //mnaually get code submission after solve
  const { refetch: getSubmission } =
    trpc.challenges.get_code_submission.useQuery(
      {
        challenge_id: challengeData?.challenge_id,
        user_uuid: userData?.user_uuid,
      },
      { enabled: false },
    );

  //respond to postgres changes if solved challenge inserted in db
  useEffect(() => {
    if (!userData?.user_team_name) return;
    const channel = supabase
      .channel(
        `${userData?.user_team_name}-challenge-${challengeData?.challenge_id}`,
      )
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "app_schema",
          table: "app_solved_challenges",
        },
        () => {
          const checkSolvedStatus = async () => {
            const isSolved = await checkSolved();
            if (isSolved.data) {
              setSolved(true);
              toast({
                variant: "success",
                title: `+ ${challengeData?.challenge_points} points!`,
                duration: 4000,
              });
              router.refresh();
            }
            const result = await getSubmission();
            const submissionCode =
              result.data?.solved_challenge_code_submission;
            const submissionLanguage = result.data
              ?.solved_challenge_language as TLanguages;
            if (submissionCode && submissionLanguage) {
              setValue(submissionCode);
              setLanguage(submissionLanguage);
            }
          };
          void checkSolvedStatus();
        },
      );

    channel.subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [checkSolved, setValue, setLanguage]);

  return <></>;
}
