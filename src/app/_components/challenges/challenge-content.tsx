"use client";
import { Button } from "@/app/_components/ui/button";
import { cn } from "@/app/_lib/client-utils";
import { trpc } from "@/app/_trpc/react";
import React, { useEffect } from "react";
import { useState } from "react";
import ProtectedEditorSiteHeader from "../nav/protected-editor-site-header";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  functionTypeMapping,
  paramTypes,
  type TFunctionTypeMapping,
  type TParamTypes,
} from "@/app/_lib/zod-schemas/forms/challenges";
import { type TSubmitData } from "@/server/procedures/protected/challenges/runCodeProcedure";
import ChallengeNavActions from "./challenge-nav-actions";
import ChallengeContentInfo from "./challenge-content-info";
import ChallengeEditor from "./challenge-editor";
import { type TLanguages } from "@/server/zod-schemas/challenges";

export default function ChallengeContentPage({
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
  const [outputData, setOutputData] = useState<TSubmitData>({
    type: "valid",
    output: "",
  });
  const [language, setLanguage] = useState<TLanguages>("python");
  const [header, setHeader] = useState("");
  const [presetHeader, setPresetHeader] = useState("");
  const [solved, setSolved] = useState(false);

  const { data: challengeData, isSuccess } =
    trpc.challenges.get_challenge.useQuery({
      challenge_id: parseInt(challengeId as unknown as string),
    });

  useEffect(() => {
    if (challengeData) {
      const header = challengeData?.challenge_function_header;
      const newHeader = formatHeader(header, language);
      setHeader(newHeader!);
      const preset = getPresetHeader(newHeader!, language);
      setPresetHeader(preset);
    }
  }, [challengeData, language]);

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
      </ProtectedEditorSiteHeader>

      <div className="grid grid-cols-1 md:grid-cols-2">
        <ChallengeContentInfo
          challengeData={challengeData}
          isSuccess={isSuccess}
        />
        <div className="flex flex-col">
          <ChallengeEditor
            value={value}
            setValue={setValue}
            language={language}
            header={presetHeader}
          />

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
      newHeader = `def ${newHeader}`;
    } else {
      newHeader = `function ${newHeader}`;
    }
    return newHeader;
  } else if (language == "cpp") {
    const match = newHeader?.match(/(\w+)\s+(\w+)\((.*)\)/);

    const functionType = match![1] as keyof typeof functionTypeMapping;
    const params = match![3];

    const mappedFunctionType = functionTypeMapping[functionType];

    newHeader = newHeader?.replace(functionType, mappedFunctionType);

    const paramList = params!.split(",").map((param) => param.trim());

    paramList.forEach((param) => {
      const [type, name] = param.split(" ");
      const mappedType =
        functionTypeMapping[type as keyof typeof functionTypeMapping];

      if (mappedType) {
        newHeader = newHeader?.replace(param, `${mappedType} ${name}`);
      }
    });
    return `${newHeader}`;
  }
}

function getPresetHeader(header: string, language: TLanguages) {
  if (language === "python")
    return `# Implement this function\n${header}:\n\t\n`;
  else return `// Implement this function\n${header}{\n\t\n}\n`;
}
