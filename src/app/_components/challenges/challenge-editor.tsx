"use client";
import React, {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

import { type TLanguages } from "@/server/zod-schemas/challenges";
import { trpc } from "@/app/_trpc/react";
import { useChallenge } from "./challenge-context-provider";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { type editor } from "monaco-editor";
import { useTheme } from "next-themes";
import CodeMirror from "codemirror";

type ChallengeEditor = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  setLanguage: Dispatch<SetStateAction<TLanguages>>;
  language: TLanguages;
  header: string;
  solved: boolean;
};

export default function ChallengeEditorWrapper({
  value,
  setValue,
  setLanguage,
  header,
}: ChallengeEditor) {
  const { theme } = useTheme();
  const { userData, challengeData } = useChallenge();
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const { data: submission } = trpc.challenges.get_code_submission.useQuery(
    {
      challenge_id: challengeData?.challenge_id as unknown as number,
      user_uuid: userData?.user_uuid as unknown as string,
    },
    { enabled: !isFetched },
  );

  useEffect(() => {
    if (submission) {
      const submissionCode = submission?.solved_challenge_code_submission;
      const submissionLanguage =
        submission?.solved_challenge_language as TLanguages;
      setValue(submissionCode!);
      setLanguage(submissionLanguage);
      setIsFetched(true);
    } else {
      // this can be commented out if the socket server sets the header
      // setValue(header);
    }
  }, [header, submission, setLanguage, setValue]);

  useEffect(() => {
    if (value.length > 0) setValue(value);
  }, []);

  // SOCKET LOGIC BELOW------------------------------------------------
  const roomName = `${userData?.user_team_name}s${challengeData?.challenge_id}`;
  // const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  // const docRef = useRef<Y.Doc | null>(null);
  // const providerRef = useRef<WebrtcProvider | null>(null);

  // function handleEditorDidMount(editor: editor.IStandaloneCodeEditor) {
  //   editorRef.current = editor;
  //   if (editorRef.current && !docRef.current) {
  //     const doc = new Y.Doc();

  //     const provider = new WebrtcProvider(roomName, doc, {
  //       signaling: ["wss://sly-living-goose.glitch.me"],
  //     });

  //     docRef.current = doc;
  //     providerRef.current = provider;

  //     const type = doc.getText("monaco");

  //     // Bind Monaco editor to Yjs document
  //     const binding = new MonacoBinding(
  //       type,
  //       editorRef.current.getModel(),
  //       new Set([editorRef.current]),
  //       provider.awareness,
  //     );
  //   }
  // }
  const docRef = useRef<Y.Doc | null>(null);
  const providerRef = useRef<WebrtcProvider | null>(null);
  useEffect(() => {
    try {
      if (!docRef.current) {
        const ydoc = new Y.Doc();
        docRef.current = ydoc;

        const provider = new WebrtcProvider(roomName, ydoc, {
          // signaling: ["wss://sly-living-goose.glitch.me"],
        });
        const yText = ydoc.getText("codemirror");
        const yUndoManager = new Y.UndoManager(yText);

        const e = new CodeMirror(document.getElementById("editor"), {
          mode: "simplemode",
          lineNumbers: true,
          theme: "material-darker",
        });
        window.binding = new CodemirrorBinding(yText, e, provider.awareness, {
          yUndoManager,
        });
        console.log("connect to", room);
        window.binding.awareness.setLocalStateField("user", {
          color: color,
          name: name,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [roomName]);

  return (
    <div className="h-full min-h-[400px]">
      <div id="editor"></div>
      {/* <Editor
        onMount={handleEditorDidMount}
        options={{
          theme: theme === "dark" ? "vs-dark" : "light",
        }}
      /> */}
    </div>
  );
}
