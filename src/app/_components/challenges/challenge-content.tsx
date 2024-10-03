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
  TParamTypeMapping,
} from "@/app/_lib/zod-schemas/forms/challenges";

export default function ChallengePageContent({
  userDisplayName,
  userEmailAddress,
  challengeId,
}: {
  userDisplayName: string;
  userEmailAddress: string;
  challengeId: number;
}) {
  const [value, setValue] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("python");
  const [header, setHeader] = useState("");

  type TData = {
    type: "valid" | "error";
    output: string;
  };

  const { data: challengeData, isSuccess } =
    trpc.challenges.get_challenge.useQuery({
      challenge_id: parseInt(challengeId as unknown as string),
    });

  const { data: outputData } = trpc.challenges.test_code.useQuery(
    { codeString: value },
    {
      enabled,
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSuccess: async (outputData: TData) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setOutput(outputData.output);
        setEnabled(false);
      },
      onError: () => {
        setEnabled(false);
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
        const formattedHeader = "def " + newHeader + ":\n\t";
        setHeader(formattedHeader);
      } else {
        const formattedHeader = "function " + newHeader + "{\n\t\n}";
        setHeader(formattedHeader);
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

      const formattedHeader = `${newHeader} {\n\t\n}`;
      setHeader(formattedHeader);
    }
  }

  const editorRef = useRef<unknown>(null);

  useEffect(() => {
    if (challengeData) {
      formatHeader();
    }
  }, [challengeData, language]);

  useEffect(() => {
    const defaultValue =
      language === "python"
        ? `# Implement this function. \n${header}`
        : `// Implement this function. \n${header}`;

    if (editorRef.current) {
      editorRef.current.setValue(defaultValue);
    }
  }, [language, header]);

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
          onClick={() => {
            setEnabled(true);
          }}
          disabled={enabled}
        >
          <Play />
          <span className="ml-4 hidden md:block">Run</span>
        </Button>
        <Button variant="secondary">
          <Send />
          <span className="ml-4 hidden md:block">Submit</span>
        </Button>
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
          <div className="flex-grow bg-background-variant p-4 font-mono">
            <pre
              className={cn(
                "h-[160px] text-wrap",
                outputData?.type == "error" ? "text-red-400" : "",
              )}
            >
              {output}
            </pre>
          </div>
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
        <pre className="text-wrap text-sm font-light">
          {challengeData?.challenge_description}
        </pre>
        <Label>Input</Label>
        <pre className="text-wrap bg-background-variant font-mono">
          {challengeData?.challenge_example_input}
        </pre>
        <Label>Output</Label>
        <pre className="text-wrap bg-background-variant font-mono">63</pre>
        <Label>Explanation</Label>
        <pre className="text-wrap text-sm font-light">
          {challengeData?.challenge_explanation}
        </pre>
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
