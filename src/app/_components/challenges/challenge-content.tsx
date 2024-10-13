"use client";
import { Button } from "@/app/_components/ui/button";
import { cn } from "@/app/_lib/client-utils";
import { trpc } from "@/app/_trpc/react";
import React, { useEffect } from "react";
import { useState } from "react";
import ProtectedEditorSiteHeader from "../nav/protected-editor-site-header";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  functionTypeMapping,
  functionTypes,
} from "@/app/_lib/zod-schemas/forms/challenges";
import { type TSubmitData } from "@/server/procedures/protected/challenges/runCodeProcedure";
import ChallengeNavActions from "./challenge-nav-actions";
import ChallengeContentInfo from "./challenge-content-info";
import ChallengeEditor from "./challenge-editor";
import { type TLanguages } from "@/server/zod-schemas/challenges";
import { toast } from "../ui/use-toast";
import { siteConfig } from "@/app/_config/site";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

export default function ChallengeContentPage({
  userDisplayName,
  userEmailAddress,
  challengeId,
  userUUID,
  teamName,
}: {
  userDisplayName: string;
  userEmailAddress: string;
  challengeId: number;
  userUUID: string;
  teamName: string;
}) {
  const [value, setValue] = useState("");
  const [outputData, setOutputData] = useState<TSubmitData>({
    type: "valid",
    output: "",
  });
  const [language, setLanguage] = useState<TLanguages>("python");
  const [header, setHeader] = useState("");
  const [presetHeader, setPresetHeader] = useState("");
  const [solved, setSolved] = useState(false);

  const { data: challengeData, isSuccess } =
    trpc.challenges.get_challenge.useQuery({
      challenge_id: challengeId,
    });

  useEffect(() => {
    if (challengeData) {
      const header = challengeData?.challenge_function_header;
      const newHeader = formatHeader(header, language);
      setHeader(newHeader!);
      const preset = getPresetHeader(newHeader!, language);
      setPresetHeader(preset);
    }
  }, [challengeData, language]);

  const router = useRouter();
  const { data: is_challenges_enabled } =
    trpc.event.is_challenges_enabled.useQuery();
  const { data: role } = trpc.user.get_user_role.useQuery({
    user_uuid: userUUID,
  });

  if (!is_challenges_enabled && role?.get_user_role === "participant") {
    router.push(siteConfig.paths.challenges);
    toast({
      variant: "destructive",
      title: "Challenges are now disabled.",
      duration: 4000,
    });
  }

  type TUserTracker = string[];
  type TPresenceState = Record<
    string,
    { user_name: string; presence_ref: string }[]
  >;
  const [currentUsers, setCurrentUsers] = useState<TUserTracker>([]);
  useEffect(() => {
    const supabase = createClientComponentClient();
    const room = supabase.channel(`${teamName}-room-${challengeId}`);
    room
      .on("presence", { event: "sync" }, () => {
        const presenceState: TPresenceState = room.presenceState();
        const users: TUserTracker = [];

        for (const key in presenceState) {
          const userPresences = presenceState[key];
          userPresences?.forEach((presence) => {
            if (presence.user_name !== userDisplayName)
              users.push(presence.user_name);
          });
        }

        setCurrentUsers(users);
      })
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await room.track({
            user_name: userDisplayName,
          });
        }
      });

    return () => {
      room.unsubscribe().catch((error) => {
        console.log(error);
      });
    };
  }, []);

  return (
    <>
      <ProtectedEditorSiteHeader
        userDisplayName={userDisplayName}
        userEmailAddress={userEmailAddress}
      >
        <Button
          variant="secondary"
          className="ml-4 mr-auto p-2 sm:flex md:p-4"
          onClick={() => router.back()}
        >
          <ArrowLeft />
          <span className="ml-4 hidden md:block">Challenges</span>
        </Button>
        <ChallengeNavActions
          value={value}
          challengeId={challengeId}
          header={header}
          language={language}
          userUUID={userUUID}
          setLanguage={setLanguage}
          solved={solved}
          setSolved={setSolved}
          setOutputData={setOutputData}
          challengePoints={challengeData?.challenge_points ?? 0}
        />
      </ProtectedEditorSiteHeader>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <ChallengeContentInfo
          challengeData={challengeData}
          isSuccess={isSuccess}
        />
        <div className="flex flex-col">
          <ChallengeEditor
            value={value}
            setValue={setValue}
            language={language}
            header={presetHeader}
            solved={solved}
            userUUID={userUUID}
            challengeId={challengeId}
          />

          <pre
            className={cn(
              "w-full whitespace-pre-wrap text-wrap break-words bg-background-variant p-4 font-mono",
              outputData.type == "error" ? "text-red-400" : "",
            )}
          >
            {outputData.output}
          </pre>
        </div>
      </div>
      <div className="fixed bottom-4 right-4 z-[50] flex">
        {currentUsers.map((user, i) => (
          <HoverCard key={`user-${i}`}>
            <HoverCardTrigger asChild>
              <Avatar key={`user-${i}`} className="cursor-pointer">
                <AvatarFallback>{user[0]}</AvatarFallback>
              </Avatar>
            </HoverCardTrigger>
            <HoverCardContent className="mr-4 w-auto p-2">
              <p className="text-sm">{user} is here.</p>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
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
    return `// Implement this function\n${header}{\n\t\n}\n`;
  else return `// Implement this function\nfunction ${header}{\n\t\n}\n`;
}
