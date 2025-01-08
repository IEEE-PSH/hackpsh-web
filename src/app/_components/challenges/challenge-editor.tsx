"use client";
import React, {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useState,
} from "react";
import { Editor } from "@monaco-editor/react";
import { type TLanguages } from "@/server/zod-schemas/challenges";
import { trpc } from "@/app/_trpc/react";
import { useTheme } from "next-themes";
import { useChallenge } from "./challenge-context-provider";

type ChallengeEditor = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  setLanguage: Dispatch<SetStateAction<TLanguages>>;
  language: TLanguages;
  header: string;
  solved: boolean;
};

export default function ChallengeEditorWrapper({
  value,
  setValue,
  language,
  setLanguage,
  header,
  solved,
}: ChallengeEditor) {
  const { userData, challengeData } = useChallenge();
  //update code submission only on initial render
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const { data: submission } = trpc.challenges.get_code_submission.useQuery(
    {
      challenge_id: challengeData?.challenge_id as unknown as number,
      user_uuid: userData?.user_uuid as unknown as string,
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
