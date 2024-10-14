"use client";
import { trpc } from "@/app/_trpc/react";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function ChallengeSyncer({
  challengeId,
  challengePoints,
  teamName,
  userUUID,
  setSolved,
  setValue,
}: {
  challengeId: number;
  challengePoints: number;
  teamName: string;
  userUUID: string;
  setSolved: Dispatch<SetStateAction<boolean>>;
  setValue: Dispatch<SetStateAction<string>>;
}) {
  const router = useRouter();
  const supabase = createClientComponentClient();

  //manually check if solved; notify all clients
  const { refetch: checkSolved } = trpc.challenges.is_solved_challenge.useQuery(
    {
      challenge_id: challengeId,
      user_uuid: userUUID,
    },
    { enabled: false },
  );

  //mnaually get code submission after solve
  const { refetch: getSubmission } =
    trpc.challenges.get_code_submission.useQuery(
      {
        challenge_id: challengeId,
        user_uuid: userUUID,
      },
      { enabled: false },
    );

  //respond to postgres changes if solved challenge inserted in db
  useEffect(() => {
    const channel = supabase.channel(`${teamName}-challenge-${challengeId}`).on(
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
              title: `+ ${challengePoints} points!`,
              duration: 4000,
            });
            router.refresh();
          }
          const result = await getSubmission();
          const submission = result.data?.solved_challenge_code_submission;
          if (submission) {
            setValue(submission);
          }
        };
        void checkSolvedStatus();
      },
    );

    channel.subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [checkSolved, router, setValue, teamName, challengeId, challengePoints]);

  return <></>;
}