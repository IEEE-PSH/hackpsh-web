"use client";
import React, {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useState,
} from "react";
import { Editor } from "@monaco-editor/react";
import { type TLanguages } from "@/server/zod-schemas/challenges";
import { cn } from "@/app/_lib/client-utils";
import { trpc } from "@/app/_trpc/react";
import { type TSubmitData } from "@/server/procedures/protected/challenges/submitCodeProcedure";

type ChallengeEditor = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  setLanguage: Dispatch<SetStateAction<TLanguages>>;
  language: TLanguages;
  header: string;
  solved: boolean;
  userUUID: string;
  challengeId: number;
  outputData: TSubmitData;
};

export default function ChallengeEditorWrapper({
  value,
  setValue,
  language,
  setLanguage,
  header,
  solved,
  userUUID,
  challengeId,
  outputData,
}: ChallengeEditor) {
  //update code submission only on initial render
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const { data: submission } = trpc.challenges.get_code_submission.useQuery(
    {
      challenge_id: challengeId,
      user_uuid: userUUID,
    },
    { enabled: !isFetched },
  );
  useEffect(() => {
    if (submission) {
      const submissionCode = submission?.solved_challenge_code_submission;
      const submissionLanguage =
        submission?.solved_challenge_language as TLanguages;
      setValue(submissionCode!);
      setLanguage(submissionLanguage);
      setIsFetched(true);
    } else setValue(header);
  }, [header, submission, setLanguage, language, setValue]);

  return (
    <div className="flex flex-col">
      <div className={cn(solved && "cursor-not-allowed", "h-[320px]")}>
        <Editor
          className={cn(solved && "pointer-events-none")}
          height="100%"
          theme="vs-dark"
          language={language}
          defaultLanguage={language ?? "python"}
          value={value}
          loading={""}
          onChange={(newValue) => setValue(newValue!)}
          options={{ readOnly: solved }}
        />
        <pre
          className={cn(
            "w-full whitespace-pre-wrap text-wrap break-words bg-background-variant p-4 font-mono",
            outputData?.type == "error" ? "text-red-400" : "",
          )}
        >
          {outputData?.output}
        </pre>
      </div>
    </div>
  );
}
