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
import { useChallenge } from "./challenge-context-provider";

type ChallengeNavActionsProps = {
  value: string;
  header: string;
  language: "python" | "cpp" | "javascript";
  solved: boolean;
  setLanguage: Dispatch<SetStateAction<TLanguages>>;
  setOutputData: Dispatch<SetStateAction<TSubmitData | null>>;
};

export default function ChallengeNavActions({
  value,
  header,
  language,
  solved,
  setLanguage,
  setOutputData,
}: ChallengeNavActionsProps) {
  const { userData, challengeData } = useChallenge();
  //runs code
  const { refetch: runCode, isFetching: isRunning } =
    trpc.challenges.run_code.useQuery(
      {
        code_string: value,
        challenge_id: challengeData?.challenge_id,
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

  const { data: onTeam, refetch: checkUserOnTeam } =
    trpc.user.is_on_team.useQuery({
      user_uuid: userData?.user_uuid,
    });

  //runs code
  async function attemptRunCode() {
    await checkUserOnTeam();
    if (
      !challengeData?.challenge_is_live ||
      (onTeam?.is_on_team && challengeData?.challenge_is_live)
    )
      await runCode();
    else {
      toast({
        variant: "destructive",
        description: "You must be on a team to participate in live challenges.",
        duration: 4000,
      });
    }
  }
  //submits code
  async function attemptSubmitCode() {
    await checkUserOnTeam();
    if (
      !challengeData?.challenge_is_live ||
      (onTeam?.is_on_team && challengeData?.challenge_is_live)
    )
      await submitCode();
    else {
      toast({
        variant: "destructive",
        description: "You must be on a team to participate in live challenges.",
        duration: 4000,
      });
    }
  }
  const { refetch: submitCode, isFetching: isSubmitting } =
    trpc.challenges.submit_code.useQuery(
      {
        code_string: value,
        challenge_id: challengeData?.challenge_id,
        challenge_header: header,
        language: language,
        user_uuid: userData?.user_uuid,
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
    user_uuid: userData?.user_uuid,
  });

  return (
    <div className="ml-auto flex space-x-4">
      {role?.get_user_role !== "participant" && (
        <Button className="p-2 md:p-4" variant="secondary" asChild>
          <Link
            href={
              siteConfig.paths.edit_challenge +
              "/" +
              challengeData?.challenge_id
            }
          >
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
              <SelectValue defaultValue={"cpp"} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {challengeData?.challenge_languages
                  .split(",")
                  .map((language) => (
                    <SelectItem key={language} value={language}>
                      {language === "python"
                        ? "Python"
                        : language === "cpp"
                          ? "C++"
                          : "Javascript"}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            className="p-2 md:p-4"
            variant="secondary"
            disabled={isRunning}
            onClick={() => attemptRunCode()}
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
