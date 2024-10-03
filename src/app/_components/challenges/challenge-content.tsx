"use client";
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { cn } from "@/app/_lib/client-utils";
import { trpc } from "@/app/_trpc/react";
import { Label } from "@radix-ui/react-label";
import React from "react";
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

  type TData = {
    type: "valid" | "error";
    output: string;
  };

  const { data: challengeData } = trpc.challenges.get_challenge.useQuery({
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
            console.log(language);
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
        <div className="flex flex-col">
          <div className="h-[320px]">
            <Editor
              height="100%"
              theme="vs-dark"
              defaultLanguage="python"
              defaultValue={`# Implement this function. \ndef GetResult(a,b):`}
              value={value}
              onChange={(value) => setValue(value!)}
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
}
