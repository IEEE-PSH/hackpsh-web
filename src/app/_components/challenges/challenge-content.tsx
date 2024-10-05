"use client";
import { Button } from "@/app/_components/ui/button";
import { cn } from "@/app/_lib/client-utils";
import { trpc } from "@/app/_trpc/react";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import ProtectedEditorSiteHeader from "../nav/protected-editor-site-header";
import { ArrowLeft } from "lucide-react";
import { Editor } from "@monaco-editor/react";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import {
  paramTypeMapping,
  paramTypes,
} from "@/app/_lib/zod-schemas/forms/challenges";
import {
  type TData,
  type TLanguages,
} from "@/server/procedures/protected/challenges/runCodeProcedure";
import ChallengeNavActions from "./challenge-nav-actions";
import ChallengeContentInfo from "./challenge-content-info";

export default function ChallengePageContent({
  userDisplayName,
  userEmailAddress,
  challengeId,
  userUUID,
}: {
  userDisplayName: string;
  userEmailAddress: string;
  challengeId: number;
  userUUID: string;
}) {
  const [value, setValue] = useState("");
  const [outputData, setOutputData] = useState<TData>({
    type: "valid",
    output: "",
  });
  const [language, setLanguage] = useState<TLanguages>("python");
  const [header, setHeader] = useState("");
  const [solved, setSolved] = useState(false);

  const { data: challengeData, isSuccess } =
    trpc.challenges.get_challenge.useQuery({
      challenge_id: parseInt(challengeId as unknown as string),
    });

  //checks if solved on mount
  const { isFetchedAfterMount } = trpc.challenges.is_solved_challenge.useQuery(
    {
      challenge_id: parseInt(challengeId as unknown as string),
      user_uuid: userUUID,
    },
    {
      onSuccess: (isSolved: boolean) => {
        setSolved(isSolved);
      },
    },
  );

  const editorRef = useRef<unknown>(null);

  useEffect(() => {
    if (challengeData) {
      const header = challengeData?.challenge_function_header;
      const newHeader = formatHeader(header, language);
      setHeader(newHeader!);
    }
  }, [challengeData, language]);

  useEffect(() => {
    editorRef?.current?.setValue(header);
  }, [language, setHeader, header]);

  const router = useRouter();

  return (
    <>
      <ProtectedEditorSiteHeader
        userDisplayName={userDisplayName}
        userEmailAddress={userEmailAddress}
      >
        <Button
          variant="secondary"
          className="ml-4 mr-auto hidden sm:flex"
          onClick={() => router.back()}
        >
          <ArrowLeft />
          <span className="ml-4">Challenges</span>
        </Button>
        {isFetchedAfterMount ? (
          <ChallengeNavActions
            value={value}
            challengeId={challengeId}
            header={header}
            language={language}
            userUUID={userUUID}
            setLanguage={setLanguage}
            solved={solved}
            setSolved={setSolved}
            setOutputData={setOutputData}
          />
        ) : (
          <Skeleton className="h-10 w-full md:w-96" />
        )}
      </ProtectedEditorSiteHeader>

      <div className="grid grid-cols-1 md:grid-cols-2">
        <ChallengeContentInfo
          challengeData={challengeData}
          isSuccess={isSuccess}
        />
        <div className="flex flex-col">
          <div className="h-[320px]">
            <Editor
              height="100%"
              theme="vs-dark"
              language={language}
              defaultLanguage="python"
              defaultValue={header}
              value={value}
              onChange={(value) => setValue(value!)}
              onMount={(editor) => {
                editorRef.current = editor;
              }}
            />
          </div>

          <pre
            className={cn(
              "w-full whitespace-pre-wrap text-wrap break-words bg-background-variant p-4 font-mono",
              outputData.type == "error" ? "text-red-400" : "",
            )}
          >
            {outputData.output}
          </pre>
        </div>
      </div>
    </>
  );
}

function formatHeader(header: string, language: TLanguages) {
  let newHeader = header;

  if (language == "python" || language == "javascript") {
    paramTypes.forEach((type) => {
      const regex = new RegExp(`\\b${type}\\s+`, "g");
      newHeader = newHeader?.replace(regex, "");
    });
    if (language == "python") {
      newHeader = `# Implement this function. \ndef ${newHeader}:\n\t`;
    } else {
      newHeader = `// Implement this function. \nfunction ${newHeader}{\n\t\n}`;
    }
    return newHeader;
  } else if (language == "cpp") {
    const match = newHeader?.match(/(\w+)\s+(\w+)\((.*)\)/);

    const functionType = match![1];
    const params = match![3];

    const mappedFunctionType =
      paramTypeMapping[functionType as keyof typeof paramTypeMapping];

    newHeader = newHeader?.replace(functionType!, mappedFunctionType);

    const paramList = params!.split(",").map((param) => param.trim());

    paramList.forEach((param) => {
      const [type, name] = param.split(" ");
      const mappedType =
        paramTypeMapping[type as keyof typeof paramTypeMapping];

      if (mappedType) {
        newHeader = newHeader?.replace(param, `${mappedType} ${name}`);
      }
    });
    return `// Implement this function. \nfunction ${newHeader}{\n\t\n}`;
  }
}
