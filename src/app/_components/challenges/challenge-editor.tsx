"use client";
import React, {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useState,
} from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { type TLanguages } from "@/server/zod-schemas/challenges";
import { trpc } from "@/app/_trpc/react";
import { useTheme } from "next-themes";
import { useChallenge } from "./challenge-context-provider";
import { io, Socket } from "socket.io-client";

type ChallengeEditor = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  setLanguage: Dispatch<SetStateAction<TLanguages>>;
  language: TLanguages;
  header: string;
  solved: boolean;
};

function debounce<T extends unknown[]>(
  func: (...args: T) => void,
  delay: number,
): (...args: T) => void {
  let debounceTimer: NodeJS.Timeout | null = null;

  return (...args: T) => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    debounceTimer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

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
      setValue(header);
    }
  }, [header, submission, setLanguage, setValue]);

  useEffect(() => {
    if (value.length > 0) setValue(value);
  }, []);

  const [socket, setSocket] = useState<Socket | null>(null);
  const roomName = `${userData?.user_team_name}-socket-${challengeData?.challenge_id}`;

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
  }, [roomName]);

  useEffect(() => {
    if (socket) {
      socket.on("message", (data: { new_content: string }) => {
        if (data.new_content !== value) {
          setValue(data.new_content);
        }
      });
    }

    return () => {
      if (socket) {
        socket.off("message");
      }
    };
  }, [socket, value]);

  const handleOnChange = debounce((newValue: string) => {
    setValue(newValue);
    if (socket) {
      socket.emit("message", { room_name: roomName, content: newValue });
    }
  }, 50);

  return (
    <div className="h-full min-h-[400px]">
      <CodeMirror
        value={value}
        height="100%"
        theme={theme === "dark" ? "dark" : "light"} // Adjust theme based on the app's theme
        extensions={[javascript()]} // Set the language mode here
        onChange={handleOnChange}
      />
    </div>
  );
}
