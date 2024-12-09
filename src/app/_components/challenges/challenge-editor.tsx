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
import { useTheme } from "next-themes";

type ChallengeEditor = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  setLanguage: Dispatch<SetStateAction<TLanguages>>;
  language: TLanguages;
  header: string;
  solved: boolean;
  userUUID: string;
  challengeId: number;
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
  //initial editor value
  useEffect(() => {
    if (submission) {
      const submissionCode = submission?.solved_challenge_code_submission;
      const submissionLanguage =
        submission?.solved_challenge_language as TLanguages;
      setValue(submissionCode!);
      setLanguage(submissionLanguage);
      setIsFetched(true);
    } else {
      setValue(header);
    }
  }, [header, submission, setLanguage, language]);

  useEffect(() => {
    if (value.length > 0) setValue(value);
  }, []);

  const { theme } = useTheme();

  return (
    <div className="h-full min-h-[400px]">
      <Editor
        className="cursor-wait"
        height="100%"
        theme={theme === "dark" ? "vs-dark" : "light"}
        language={language}
        defaultLanguage={language ?? "python"}
        value={value}
        loading={""}
        onChange={(newValue) => setValue(newValue!)}
        options={{
          readOnly: solved,
          minimap: { enabled: false },
          automaticLayout: true,
          contextmenu: false,
        }}
      />
    </div>
  );
}
