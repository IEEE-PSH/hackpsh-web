"use client";
import React, { type Dispatch, type SetStateAction, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import { type TLanguages } from "@/server/zod-schemas/challenges";
import { cn } from "@/app/_lib/client-utils";
import { trpc } from "@/app/_trpc/react";

type ChallengeEditor = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  language: TLanguages;
  header: string;
  solved: boolean;
  userUUID: string;
  challengeId: number;
};

export default function ChallengeEditor({
  value,
  setValue,
  language,
  header,
  solved,
  userUUID,
  challengeId,
}: ChallengeEditor) {
  const { data: submission } = trpc.challenges.get_code_submission.useQuery({
    challenge_id: challengeId,
    user_uuid: userUUID,
  });

  useEffect(() => {
    setValue(submission?.solved_challenge_code_submission ?? header);
  }, [language, header, setValue, submission]);

  return (
    <div className="h-[320px]">
      <Editor
        className={cn(solved && "pointer-events-none")}
        height="100%"
        theme="vs-dark"
        language={language}
        defaultLanguage="python"
        value={value}
        onChange={(value) => setValue(value!)}
        options={{ readOnly: solved }}
      />
    </div>
  );
}
