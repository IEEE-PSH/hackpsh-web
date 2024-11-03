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
  functionTypes,
} from "@/app/_lib/zod-schemas/forms/challenges";
import ChallengeNavActions from "./challenge-nav-actions";
import ChallengeContentInfo from "./challenge-content-info";
import ChallengeEditor from "./challenge-editor";
import { type TLanguages } from "@/server/zod-schemas/challenges";
import ChallengeUsersStatus from "./challenge-users-status";
import ChallengeBooter from "./challenge-booter";
import ChallengeSyncer from "./challenge-syncer";
import { type TSubmitData } from "@/server/procedures/protected/challenges/submitCodeProcedure";
import Link from "next/link";

export default function ChallengeContentPage({
  userDisplayName,
  userEmailAddress,
  challengeId,
  userUUID,
  teamName,
}: {
  userDisplayName: string;
  userEmailAddress: string;
  challengeId: number;
  userUUID: string;
  teamName: string | null;
}) {
  const [value, setValue] = useState("");
  const [outputData, setOutputData] = useState<TSubmitData | null>(null);
  const [language, setLanguage] = useState<TLanguages>("python");
  const [header, setHeader] = useState("");
  const [presetHeader, setPresetHeader] = useState("");
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    const storedLanguage = localStorage.getItem(
      "hackpsh-stored-language",
    ) as TLanguages;
    setLanguage(storedLanguage ?? "python");
  }, []);

  const { data: challengeData, isSuccess } =
    trpc.challenges.get_challenge.useQuery({
      challenge_id: challengeId,
    });

  const { isFetchedAfterMount: checkedSolvedStatus } =
    trpc.challenges.is_solved_challenge.useQuery(
      {
        challenge_id: challengeId,
        user_uuid: userUUID,
      },
      {
        onSuccess: (isSolved: boolean) => {
          if (isSolved) {
            router.refresh();
            setSolved(true);
          }
        },
      },
    );

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
      <ChallengeBooter />
      {teamName && (
        <ChallengeSyncer
          challengeId={challengeId}
          challengePoints={challengeData?.challenge_points ?? 0}
          teamName={teamName}
          userUUID={userUUID}
          setSolved={setSolved}
          setValue={setValue}
          setLanguage={setLanguage}
        />
      )}

      <ProtectedEditorSiteHeader
        userDisplayName={userDisplayName}
        userEmailAddress={userEmailAddress}
      >
        <Button
          variant="secondary"
          className="ml-4 mr-auto hidden p-2 sm:flex lg:p-4"
          asChild
        >
          <Link href="#" onClick={() => router.back()}>
            <ArrowLeft />
            <span className="ml-4 hidden lg:block">Challenges</span>
          </Link>
        </Button>
        <ChallengeNavActions
          value={value}
          challengeId={challengeId}
          header={header}
          language={language}
          userUUID={userUUID}
          solved={solved}
          checkedSolvedStatus={checkedSolvedStatus}
          setLanguage={setLanguage}
          setOutputData={setOutputData}
          teamName={teamName}
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
            setLanguage={setLanguage}
            header={presetHeader}
            solved={solved}
            userUUID={userUUID}
            challengeId={challengeId}
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
      {teamName && (
        <ChallengeUsersStatus
          userDisplayName={userDisplayName}
          challengeId={challengeId}
          teamName={teamName}
        />
      )}
    </>
  );
}

function formatHeader(header: string, language: TLanguages) {
  let newHeader = header;

  if (language == "python" || language == "javascript") {
    functionTypes.forEach((type) => {
      const regex = new RegExp(`\\b${type}\\s+`, "g");
      newHeader = newHeader?.replace(regex, "");
    });
    if (language == "python") {
      newHeader = `${newHeader}`;
    } else {
      newHeader = `${newHeader}`;
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
    return `# Implement this function\ndef ${header}:\n\t`;
  else if (language === "cpp")
    return `#include <iostream>\n#include <vector>\n#include<string>\nusing namespace std;\n\n// Implement this function\n${header}{\n\t\n}\n`;
  else return `// Implement this function\nfunction ${header}{\n\t\n}\n`;
}
