"use client";
import React, { type Dispatch, type SetStateAction, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import { type TLanguages } from "@/server/zod-schemas/challenges";

type ChallengeEditor = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  language: TLanguages;
  header: string;
};

export default function ChallengeEditor({
  value,
  setValue,
  language,
  header,
}: ChallengeEditor) {
  useEffect(() => {
    setValue(header);
  }, [language, header, setValue]);

  return (
    <div className="h-[320px]">
      <Editor
        height="100%"
        theme="vs-dark"
        language={language}
        defaultLanguage="python"
        defaultValue={header}
        value={value}
        onChange={(value) => setValue(value!)}
      />
    </div>
  );
}
