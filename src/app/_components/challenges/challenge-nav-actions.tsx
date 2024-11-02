"use client";
import { Button } from "@/app/_components/ui/button";
import { trpc } from "@/app/_trpc/react";
import React, { type Dispatch, type SetStateAction } from "react";
import { toast } from "../ui/use-toast";
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "../ui/select";
import { Check, Edit, Play, Send } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { type TLanguages } from "@/server/zod-schemas/challenges";
import { siteConfig } from "@/app/_config/site";
import { type TSubmitData } from "@/server/procedures/protected/challenges/submitCodeProcedure";
import Link from "next/link";

type ChallengeNavActionsProps = {
  value: string;
  challengeId: number;
  header: string;
  language: "python" | "cpp" | "javascript";
  userUUID: string;
  solved: boolean;
  checkedSolvedStatus: boolean;
  setLanguage: Dispatch<SetStateAction<TLanguages>>;
  setOutputData: Dispatch<SetStateAction<TSubmitData | null>>;
  teamName: string;
};

export default function ChallengeNavActions({
  value,
  challengeId,
  header,
  language,
  userUUID,
  solved,
  checkedSolvedStatus,
  setLanguage,
  setOutputData,
  teamName,
}: ChallengeNavActionsProps) {
  //runs code
  const { refetch: runCode, isFetching: isRunning } =
    trpc.challenges.run_code.useQuery(
      {
        code_string: value,
        challenge_id: challengeId,
        challenge_header: header,
        language: language,
      },
      {
        retry: false,
        enabled: false,
        onSuccess: (outputData: TSubmitData) => {
          setOutputData(outputData);
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "Oops, something went wrong!",
            description:
              "If you've encountered an issue, please contact our event administrators for assistance. We apologize for any inconvenience and will resolve it promptly.",
            duration: 6000,
          });
        },
      },
    );

  //submits code
  function attemptSubmitCode() {
    if (teamName) submitCode();
    else {
      toast({
        variant: "destructive",
        description: "You must be on a team to submit challenges.",
        duration: 4000,
      });
    }
  }
  const { refetch: submitCode, isFetching: isSubmitting } =
    trpc.challenges.submit_code.useQuery(
      {
        code_string: value,
        challenge_id: challengeId,
        challenge_header: header,
        language: language,
        user_uuid: userUUID,
      },
      {
        enabled: false,
        retry: false,
        onSuccess: (outputData: TSubmitData) => {
          setOutputData(outputData);
        },
        onError: (error) => {
          toast({
            variant: "destructive",
            title: error.data?.code,
            description: error.message,
            duration: 4000,
          });
        },
      },
    );

  const { data: role } = trpc.user.get_user_role.useQuery({
    user_uuid: userUUID,
  });

  if (checkedSolvedStatus) {
    return (
      <div className="ml-auto flex space-x-4">
        {role?.get_user_role !== "participant" && (
          <Button className="p-2 md:p-4" variant="secondary" asChild>
            <Link href={siteConfig.paths.edit_challenge + "/" + challengeId}>
              <Edit />
              <span className="ml-4 hidden md:block">Edit</span>
            </Link>
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
              onValueChange={(language: TLanguages) => {
                setLanguage(language);
                localStorage.setItem("hackpsh-stored-language", language);
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
              disabled={isRunning}
              onClick={() => runCode()}
            >
              <Play />
              <span className="ml-4 hidden md:block">Run</span>
            </Button>
            <Button
              className="p-2 md:p-4"
              disabled={isSubmitting}
              onClick={() => attemptSubmitCode()}
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
