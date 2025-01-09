"use client";
import React, {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Controlled as CodeMirror2 } from "react-codemirror2";
import CodeMirror, { EditorView, ViewUpdate } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { vscodeDark, vscodeLight } from "@uiw/codemirror-theme-vscode";
import { type TLanguages } from "@/server/zod-schemas/challenges";
import { trpc } from "@/app/_trpc/react";
import { useTheme } from "next-themes";
import { useChallenge } from "./challenge-context-provider";
import { io, type Socket } from "socket.io-client";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";

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
  const [existingData, setExistingData] = useState<boolean>(true);
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

  // SOCKET LOGIC BELOW
  const [socket, setSocket] = useState<Socket | null>(null);
  const roomName = `${userData?.user_team_name}s${challengeData?.challenge_id}`;

  useEffect(() => {
    const s = io(process.env.NEXT_PUBLIC_GLITCH_WSS, {
      transports: ["websocket"],
      withCredentials: true,
    });
    setSocket(s);

    s.on("connect", () => {
      s.emit("joinRoom", { room_name: roomName, header: header });
    });

    if (!existingData) setValue(header);
    return () => {
      s.off("update");
      s.disconnect();
    };
  }, [roomName]);

  const editorRef = useRef<EditorView>(null);
  useEffect(() => {
    if (!socket) return;
    socket.on("update", (newContent: string) => {
      if (newContent !== value) {
        // const view = editorRef.current.view;
        // const currentPosition = view.state.selection.main.head;
        setValue(newContent);
        // requestAnimationFrame(() => {
        //   const transaction = view.state.update({
        //     selection: { anchor: currentPosition },
        //   });
        //   view.dispatch(transaction);
        // });
      }
    });

    socket.on("existingData", (content: string) => {
      setExistingData(true);
      setValue(content);
    });
  }, [socket, value]);

  const handleOnChange = debounce((newValue: string, view: ViewUpdate) => {
    if (socket) {
      setValue(newValue);
      socket.emit("update", { room_name: roomName, content: newValue });
    }
  }, 120);

  return (
    <div className="h-full min-h-[400px]" style={{ height: "100%" }}>
      <CodeMirror
        ref={editorRef}
        value={value}
        height="100%"
        theme={theme === "dark" ? vscodeDark : vscodeLight}
        extensions={[
          language === "javascript"
            ? javascript()
            : language === "cpp"
              ? cpp()
              : python(),
        ]}
        onChange={(newValue, viewUpdate) =>
          handleOnChange(newValue, viewUpdate)
        }
        style={{ height: "100%", fontSize: 14 }}
        readOnly={solved}
      />
    </div>
  );
}
