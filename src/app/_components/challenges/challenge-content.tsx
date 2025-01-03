"use client";
import { Button } from "@/app/_components/ui/button";
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
import ChallengeEditorWrapper from "./challenge-editor";
import { type TLanguages } from "@/server/zod-schemas/challenges";
import ChallengeUsersStatus from "./challenge-users-status";
import ChallengeSyncer from "./challenge-syncer";
import { type TSubmitData } from "@/server/procedures/protected/challenges/submitCodeProcedure";
import Link from "next/link";
import { type TChallengeData } from "@/server/dao/challenges";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import { cn } from "@/app/_lib/client-utils";
import { ScrollArea } from "../ui/scroll-area";

export default function ChallengeContentPage({
  userDisplayName,
  userEmailAddress,
  challengeData,
  userUUID,
  teamName,
  isSolved,
}: {
  userDisplayName: string;
  userEmailAddress: string;
  challengeData: TChallengeData;
  userUUID: string;
  teamName: string | null;
  isSolved: boolean;
}) {
  const [value, setValue] = useState<string>("");
  const [outputData, setOutputData] = useState<TSubmitData | null>(null);
  const [language, setLanguage] = useState<TLanguages>(
    challengeData!.challenge_languages.split(",")[0] as TLanguages,
  );
  const [header, setHeader] = useState("");
  const [presetHeader, setPresetHeader] = useState("");
  const [solved, setSolved] = useState(isSolved);

  const router = useRouter();

  useEffect(() => {
    const storedLanguage = localStorage.getItem(
      "hackpsh-stored-language",
    ) as TLanguages;
    if (challengeData!.challenge_languages.includes(storedLanguage))
      setLanguage(storedLanguage);
  }, []);

  useEffect(() => {
    if (challengeData) {
      const header = challengeData?.challenge_function_header;
      const newHeader = formatHeader(header, language);
      setHeader(newHeader!);
      const preset = getPresetHeader(newHeader!, language);
      setPresetHeader(preset);
    }
  }, [challengeData, language]);

  const [windowWidth, setWindowWidth] = useState(0);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (window) {
      setWindowWidth(window.innerWidth);
      setLoaded(true);
    }
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <ChallengeSyncer
        challengeId={challengeData!.challenge_id}
        challengePoints={challengeData!.challenge_points}
        teamName={teamName ?? null}
        userUUID={userUUID}
        setSolved={setSolved}
        setValue={setValue}
        setLanguage={setLanguage}
      />
      <ChallengeUsersStatus
        userDisplayName={userDisplayName}
        challengeId={challengeData!.challenge_id}
        teamName={teamName ?? null}
      />

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
            <span className="ml-4 hidden lg:block">Back</span>
          </Link>
        </Button>
        <ChallengeNavActions
          value={value}
          challengeId={challengeData!.challenge_id}
          challengeLanguages={challengeData!.challenge_languages}
          header={header}
          language={language}
          userUUID={userUUID}
          solved={solved}
          setLanguage={setLanguage}
          setOutputData={setOutputData}
          challengeLive={challengeData!.challenge_is_live!}
        />
      </ProtectedEditorSiteHeader>

      {loaded &&
        (windowWidth > 768 ? (
          <ResizablePanelGroup direction="horizontal" className="h-full grow">
            <ResizablePanel defaultSize={50} minSize={20}>
              <ScrollArea className="h-full">
                <ChallengeContentInfo
                  challengeData={challengeData}
                  isSuccess={true}
                />
              </ScrollArea>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={50} minSize={20}>
              <ResizablePanelGroup direction="vertical">
                <ResizablePanel defaultSize={65} minSize={10}>
                  <ChallengeEditorWrapper
                    value={value}
                    setValue={setValue}
                    language={language}
                    setLanguage={setLanguage}
                    header={presetHeader}
                    solved={solved}
                    userUUID={userUUID}
                    challengeId={challengeData!.challenge_id}
                  />
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={35} minSize={10}>
                  <ScrollArea className="h-full bg-background-variant">
                    <pre
                      className={cn(
                        "whitespace-pre-wrap text-wrap break-words p-4 font-mono",
                        outputData?.type == "error" ? "text-red-400" : "",
                      )}
                    >
                      {outputData?.output}
                    </pre>
                  </ScrollArea>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2">
            <ChallengeContentInfo
              challengeData={challengeData}
              isSuccess={true}
            />
            <ChallengeEditorWrapper
              value={value}
              setValue={setValue}
              language={language}
              setLanguage={setLanguage}
              header={presetHeader}
              solved={solved}
              userUUID={userUUID}
              challengeId={challengeData!.challenge_id}
            />
            <ScrollArea className="h-full min-h-[300px] bg-background-variant">
              <pre
                className={cn(
                  "whitespace-pre-wrap text-wrap break-words p-4 font-mono",
                  outputData?.type == "error" ? "text-red-400" : "",
                )}
              >
                {outputData?.output}
              </pre>
            </ScrollArea>
          </div>
        ))}
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
