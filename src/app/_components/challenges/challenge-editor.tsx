"use client";
import React, {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Editor } from "@monaco-editor/react";
import { type TLanguages } from "@/server/zod-schemas/challenges";
import { trpc } from "@/app/_trpc/react";
import { useTheme } from "next-themes";
import { useChallenge } from "./challenge-context-provider";
import { io } from "socket.io-client";

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
  language,
  setLanguage,
  header,
  solved,
}: ChallengeEditor) {
  const { theme } = useTheme();
  const { userData, challengeData } = useChallenge();
  //update code submission only on initial render
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const { data: submission } = trpc.challenges.get_code_submission.useQuery(
    {
      challenge_id: challengeData?.challenge_id as unknown as number,
      user_uuid: userData?.user_uuid as unknown as string,
    },
    { enabled: !isFetched },
  );
  //initial editor value
  useEffect(() => {
    if (submission) {
      const submissionCode = submission?.solved_challenge_code_submission;
      const submissionLanguage =
        submission?.solved_challenge_language as TLanguages;
      setValue(submissionCode!);
      setLanguage(submissionLanguage);
      setIsFetched(true);
    } else {
      setValue(header);
    }
  }, [header, submission, setLanguage, language]);

  useEffect(() => {
    if (value.length > 0) setValue(value);
  }, []);

  // SOCKET IO INTEGRATION
  const [socket, setSocket] = useState<any>(null);
  const roomName = `${userData?.user_team_name}-socket-${challengeData?.challenge_id}`;

  // Initialize socket connection
  useEffect(() => {
    const s = io("wss://sly-living-goose.glitch.me", {
      transports: ["websocket"],
      withCredentials: true,
    });
    setSocket(s);

    s.on("connect", () => {
      s.emit("joinRoom", roomName); // Join the room after connection
    });

    return () => {
      if (s) {
        s.off("message");
        s.disconnect();
      }
    };
  }, []);

  // Listening to socket messages
  useEffect(() => {
    if (socket) {
      socket.on("message", (data: { content: string; new_content: string }) => {
        if (data.content !== value) {
          setValue(data.new_content);
        }
      });
    }
  }, [socket]);

  // Handle content change in editor
  const handleOnChange = (newValue: string) => {
    if (socket) {
      socket.emit("message", { room_name: roomName, content: newValue }); // Emit message to server
    }
  };

  return (
    <div className="h-full min-h-[400px]">
      <Editor
        height="100%"
        theme={theme === "dark" ? "vs-dark" : "light"}
        language={language}
        defaultLanguage={language ?? "python"}
        value={value}
        loading={""}
        onChange={(newValue) => {
          handleOnChange(newValue!);
        }}
        options={{
          readOnly: solved,
          minimap: { enabled: false },
          automaticLayout: true,
          contextmenu: false,
        }}
      />
    </div>
  );
}
