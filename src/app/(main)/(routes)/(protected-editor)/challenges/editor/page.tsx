"use client";

import { Button } from "@/app/_components/ui/button";
import { Label } from "@/app/_components/ui/label";
import { toast } from "@/app/_components/ui/use-toast";
import { cn } from "@/app/_lib/client-utils";
import { trpc } from "@/app/_trpc/react";
import Editor from "@monaco-editor/react";
import { useState } from "react";

export default function CodingEditor() {
  const [value, setValue] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [output, setOutput] = useState(["Output is here."]);
  const [outputType, setOutputType] = useState("valid");

  type TData = {
    type: "valid" | "error";
    output: string;
  };
  const { data } = trpc.challenges.test_code.useQuery(
    { codeString: value },
    {
      enabled,
      onSuccess: async (data) => {
        // Wait for a short delay before processing the data
        await new Promise((resolve) => setTimeout(resolve, 500));
        formatOutput(data as TData);
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

  function formatOutput(data: TData) {
    const dataOutput = data.output;
    const stringArr = dataOutput.split("\n");
    setOutput(stringArr);
    if (data.type == "error") setOutputType("error");
    else setOutputType("valid");
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col space-y-4 p-4">
        <h1 className="text-2xl">Sum of Twos</h1>
        <p className="text-sm font-light">
          Lorem ipsum odor amet, consectetuer adipiscing elit. Est quis molestie
          duis, elit sollicitudin lectus. Volutpat hac phasellus elit metus arcu
          laoreet nisl sed est. Posuere aenean lectus ornare eu dapibus. Montes
          sodales nam dignissim leo ipsum consectetur litora montes. Class
          integer class ultrices semper, praesent senectus egestas.
        </p>
        <Label>Input</Label>
        <p className="bg-background-variant font-mono">5 6 1 3 12 9</p>
        <Label>Output</Label>
        <p className="bg-background-variant font-mono">63</p>
        <Label>Explanation</Label>
        <p className="text-sm font-light">
          Montes sodales nam dignissim leo ipsum consectetur litora montes.
          Class integer class ultrices semper, praesent senectus egestas.
        </p>
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
          {output.map((line, i) => (
            <span
              key={"line-" + i}
              className={cn(
                "block",
                outputType == "error" ? "text-red-400" : "",
              )}
            >
              {line}
            </span>
          ))}
        </div>
        <Button
          onClick={() => {
            setEnabled(true);
          }}
          disabled={enabled}
        >
          Run
        </Button>
      </div>
    </div>
  );
}
