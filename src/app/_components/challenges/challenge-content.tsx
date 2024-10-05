"use client";
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { cn } from "@/app/_lib/client-utils";
import { trpc } from "@/app/_trpc/react";
import { Label } from "@radix-ui/react-label";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import ProtectedEditorSiteHeader from "../nav/protected-editor-site-header";
import { ArrowLeft, Play, Send } from "lucide-react";
import { Editor } from "@monaco-editor/react";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "../ui/select";
import { Skeleton } from "../ui/skeleton";
import {
  paramTypeMapping,
  paramTypes,
} from "@/app/_lib/zod-schemas/forms/challenges";
import { type TLanguages } from "@/server/procedures/protected/challenges/runCodeProcedure";

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
  const [runEnabled, setRunEnabled] = useState(false);
  const [submitEnabled, setSubmitEnabled] = useState(false);
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("python");
  const [header, setHeader] = useState("");
  const [solved, setSolved] = useState(false);

  type TData = {
    type: "valid" | "error";
    output: string;
  };

  const { data: challengeData, isSuccess } =
    trpc.challenges.get_challenge.useQuery({
      challenge_id: parseInt(challengeId as unknown as string),
    });

  const { data: outputData } = trpc.challenges.run_code.useQuery(
    {
      code_string: value,
      challenge_id: parseInt(challengeId as unknown as string),
      challenge_header: header,
      language: language as TLanguages,
    },
    {
      enabled: runEnabled,
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSuccess: (outputData: TData) => {
        setOutput(outputData.output);
        setRunEnabled(false);
      },
      onError: () => {
        setRunEnabled(false);
        toast({
          variant: "destructive",
          title: "Oops, Something Went Wrong!",
          description:
            "If you've encountered an issue, please contact our event administrators for assistance. We apologize for any inconvenience and will resolve it promptly.",
          duration: 6000,
        });
      },
    },
  );

  const { data: isSolvedChallenge } =
    trpc.challenges.is_solved_challenge.useQuery(
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

  const { data: submitData } = trpc.challenges.submit_code.useQuery(
    {
      code_string: value,
      challenge_id: parseInt(challengeId as unknown as string),
      challenge_header: header,
      language: language as TLanguages,
      user_uuid: userUUID,
    },
    {
      enabled: submitEnabled,
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSuccess: (submitData: TData) => {
        setOutput(submitData.output);
        setSubmitEnabled(false);
      },
      onError: () => {
        setSubmitEnabled(false);
        toast({
          variant: "destructive",
          title: "Oops, Something Went Wrong!",
          description:
            "If you've encountered an issue, please contact our event administrators for assistance. We apologize for any inconvenience and will resolve it promptly.",
          duration: 6000,
        });
      },
    },
  );

  function formatHeader() {
    const header = challengeData?.challenge_function_header;
    let newHeader = header;

    if (language == "python" || language == "javascript") {
      paramTypes.forEach((type) => {
        const regex = new RegExp(`\\b${type}\\s+`, "g");
        newHeader = newHeader?.replace(regex, "");
      });
      if (language == "python") {
        setHeader("def " + newHeader);
      } else {
        setHeader("function " + newHeader);
      }
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

      setHeader(newHeader!);
    }
  }

  const editorRef = useRef<unknown>(null);

  useEffect(() => {
    if (challengeData) {
      formatHeader();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [challengeData, language]);

  useEffect(() => {
    const defaultValue =
      language === "python"
        ? `# Implement this function. \n${header}:\n\t`
        : `// Implement this function. \n${header}{\n\t\n}`;

    if (editorRef.current) {
      editorRef.current.setValue(defaultValue);
    }
  }, [language, header]);

  useEffect(() => {
    if (isSolvedChallenge) {
      setSolved(isSolvedChallenge);
    }
  }, [isSolvedChallenge]);

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
        <Select
          value={language}
          onValueChange={(value: string) => {
            setLanguage(value);
          }}
        >
          <SelectTrigger className="m-4 ml-auto w-32">
            <SelectValue defaultValue="python" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="cpp">C++</SelectItem>
              <SelectItem value="javascript">JavaScript</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          variant="secondary"
          onClick={() => {
            setRunEnabled(true);
          }}
          disabled={runEnabled}
        >
          <Play />
          <span className="ml-4 hidden md:block">Run</span>
        </Button>
        {solved ? (
          <Button disabled={true}>
            <span>Solved</span>
          </Button>
        ) : (
          <Button
            onClick={() => {
              setSubmitEnabled(true);
            }}
            disabled={submitEnabled}
          >
            <Send />
            <span className="ml-4 hidden md:block">Submit</span>
          </Button>
        )}
      </ProtectedEditorSiteHeader>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {isSuccess ? <LoadedChallengeInfo /> : <UnloadedChallengeInfo />}
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
              outputData?.type == "error" ? "text-red-400" : "",
            )}
          >
            {output}
          </pre>
        </div>
      </div>
    </>
  );

  function LoadedChallengeInfo() {
    return (
      <div className="flex flex-col space-y-4 p-4">
        <Badge
          className={cn(
            "w-16 justify-center capitalize",
            challengeData?.challenge_difficulty == "easy"
              ? "bg-green-500 hover:bg-green-500/90"
              : challengeData?.challenge_difficulty == "medium"
                ? "bg-primary hover:bg-primary/90"
                : challengeData?.challenge_difficulty == "hard"
                  ? "bg-red-500 hover:bg-red-500/90"
                  : "",
          )}
        >
          {challengeData?.challenge_difficulty}
        </Badge>
        <h1 className="text-2xl">{challengeData?.challenge_title}</h1>
        <p className="whitespace-pre-line text-sm font-light">
          {challengeData?.challenge_description}
        </p>
        <Label>Input</Label>
        <pre className="text-wrap bg-background-variant font-mono">
          {challengeData?.challenge_example_input}
        </pre>
        <Label>Output</Label>
        <pre className="text-wrap bg-background-variant font-mono">
          {challengeData?.challenge_example_output}
        </pre>
        <Label>Explanation</Label>
        <p className="whitespace-pre-line text-sm font-light">
          {challengeData?.challenge_explanation}
        </p>
      </div>
    );
  }

  function UnloadedChallengeInfo() {
    return (
      <div className="flex flex-col space-y-4 p-4">
        <Skeleton className="h-[22px] w-16" />
        <Skeleton className="h-8" />
        <Skeleton className="h-5" />
        <Label>Input</Label>
        <Skeleton className="h-5" />
        <Label>Output</Label>
        <Skeleton className="h-5" />
        <Label>Explanation</Label>
        <Skeleton className="h-5 w-16" />
      </div>
    );
  }
}
