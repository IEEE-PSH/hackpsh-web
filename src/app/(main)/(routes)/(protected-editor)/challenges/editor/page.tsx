"use client";

import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { Label } from "@/app/_components/ui/label";
import Editor from "@monaco-editor/react";
import { useState } from "react";

export default function CodingEditor() {
  const [value, setValue] = useState("");
  return (
    <div className="grid grid-cols-2">
      <div className="">
        <CardHeader>
          <CardTitle>Sum of Twos</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <p className="text-sm font-light">
            Lorem ipsum odor amet, consectetuer adipiscing elit. Est quis
            molestie duis, elit sollicitudin lectus. Volutpat hac phasellus elit
            metus arcu laoreet nisl sed est. Posuere aenean lectus ornare eu
            dapibus. Montes sodales nam dignissim leo ipsum consectetur litora
            montes. Class integer class ultrices semper, praesent senectus
            egestas.
          </p>
          <Label>Input</Label>
          <p className="my-4 bg-background-variant p-2 font-mono text-sm">
            1 2 4 3 7 5
          </p>
          <Label>Output</Label>
          <p className="my-4 bg-background-variant p-2 font-mono text-sm">72</p>
          <Label>Explanation</Label>
          <p className="text-sm font-light">
            Platea aliquet imperdiet aptent urna nec convallis ad justo. Natoque
            integer ultrices sodales suscipit class.
          </p>
        </CardContent>
      </div>
      <div className="grid grid-rows-2">
        <div className="">
          <Editor
            height="100%"
            width="100%"
            theme="vs-dark"
            defaultLanguage="python"
            defaultValue={"# Write here"}
            value={value}
            onChange={(value) => setValue(value!)}
          />
        </div>

        <div className="bg-background-variant p-4">
          <p>Hello, World!</p>
        </div>
      </div>
    </div>
  );
}
