"use client";
import { Button } from "@/app/_components/ui/button";
import { trpc } from "@/app/_trpc/react";
import React, { type Dispatch, type SetStateAction } from "react";
import { useState } from "react";
import { toast } from "../ui/use-toast";
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "../ui/select";
import { type TSubmitData } from "@/server/procedures/protected/challenges/runCodeProcedure";
import { Check, Edit, Play, Send } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { type TLanguages } from "@/server/zod-schemas/challenges";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/app/_config/site";

type ChallengeNavActionsProps = {
  value: string;
  challengeId: number;
  header: string;
  language: "python" | "cpp" | "javascript";
  userUUID: string;
  setLanguage: Dispatch<SetStateAction<TLanguages>>;
  solved: boolean;
  setSolved: Dispatch<SetStateAction<boolean>>;
  setOutputData: Dispatch<SetStateAction<TSubmitData>>;
  challengePoints: number;
};

export default function ChallengeNavActions({
  value,
  challengeId,
  header,
  language,
  userUUID,
  setLanguage,
  solved,
  setSolved,
  setOutputData,
  challengePoints,
}: ChallengeNavActionsProps) {
  const router = useRouter();
  const [runEnabled, setRunEnabled] = useState(false);
  const [submitEnabled, setSubmitEnabled] = useState(false);

  const { isFetchedAfterMount } = trpc.challenges.is_solved_challenge.useQuery(
    {
      challenge_id: challengeId,
      user_uuid: userUUID,
    },
    {
      onSuccess: (isSolved: boolean) => {
        setSolved(isSolved);
      },
    },
  );

  //submits code
  trpc.challenges.submit_code.useQuery(
    {
      code_string: value,
      challenge_id: challengeId,
      challenge_header: header,
      language: language,
      user_uuid: userUUID,
    },
    {
      retry: false,
      enabled: submitEnabled,
      onSuccess: (submitData: TSubmitData) => {
        setOutputData(submitData);
        if (submitData.type == "success") {
          setSolved(true);
          router.refresh();
          toast({
            variant: "success",
            title: `+ ${challengePoints} points!`,
            duration: 4000,
          });
        }
        setSubmitEnabled(false);
      },
      onError: (error) => {
        setSubmitEnabled(false);
        toast({
          variant: "destructive",
          title: error.data?.code,
          description: error.message,
          duration: 4000,
        });
      },
    },
  );

  //runs code
  trpc.challenges.run_code.useQuery(
    {
      code_string: value,
      challenge_id: challengeId,
      challenge_header: header,
      language: language,
    },
    {
      enabled: runEnabled,
      onSuccess: (outputData: TSubmitData) => {
        setOutputData(outputData);
        setRunEnabled(false);
      },
      onError: () => {
        setRunEnabled(false);
        toast({
          variant: "destructive",
          title: "Oops, Something went wrong!",
          description:
            "If you've encountered an issue, please contact our event administrators for assistance. We apologize for any inconvenience and will resolve it promptly.",
          duration: 6000,
        });
      },
    },
  );

  const { data: role } = trpc.user.get_user_role.useQuery({
    user_uuid: userUUID,
  });

  if (isFetchedAfterMount) {
    return (
      <div className="ml-auto flex space-x-4">
        {role?.get_user_role !== "participant" && (
          <Button
            className="p-2 md:p-4"
            variant="secondary"
            onClick={() =>
              router.push(siteConfig.paths.edit_challenge + "/" + challengeId)
            }
          >
            <Edit />
            <span className="ml-4 hidden md:block">Edit</span>
          </Button>
        )}

        {solved ? (
          <Button disabled={true}>
            <Check className="mr-2" />
            <span>Solved </span>
          </Button>
        ) : (
          <>
            <Select
              value={language}
              onValueChange={(value: TLanguages) => {
                setLanguage(value);
              }}
            >
              <SelectTrigger className="w-32">
                <SelectValue defaultValue="python" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="cpp">C++</SelectItem>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button
              className="p-2 md:p-4"
              variant="secondary"
              disabled={runEnabled}
              onClick={() => {
                setRunEnabled(true);
              }}
            >
              <Play />
              <span className="ml-4 hidden md:block">Run</span>
            </Button>
            <Button
              className="p-2 md:p-4"
              disabled={submitEnabled}
              onClick={() => {
                setSubmitEnabled(true);
              }}
            >
              <Send />
              <span className="ml-4 hidden md:block">Submit</span>
            </Button>
          </>
        )}
      </div>
    );
  }

  return <Skeleton className="h-10 w-full md:w-56" />;
}
