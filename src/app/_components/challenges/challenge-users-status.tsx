"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { createClient } from "@/app/_lib/supabase/client";
import { useChallenge } from "./challenge-context-provider";

export type TUserTracker = string[];
export type TPresenceState = Record<
  string,
  { user_name: string; presence_ref: string }[]
>;

export default function ChallengeUsersStatus() {
  const { userData, challengeData, isSolved } = useChallenge();
  const [currentUsers, setCurrentUsers] = useState<TUserTracker>([]);

  useEffect(() => {
    if (!userData?.user_team_name) return;
    const supabase = createClient();
    const room = supabase.channel(
      `${userData?.user_team_name}-room-${challengeData?.challenge_id}`,
    );
    room
      .on("presence", { event: "sync" }, () => {
        const presenceState: TPresenceState = room.presenceState();
        const users: TUserTracker = [];

        for (const key in presenceState) {
          const userPresences = presenceState[key];
          userPresences?.forEach((presence) => {
            if (presence.user_name !== userData?.user_display_name)
              users.push(presence.user_name);
          });
        }
        setCurrentUsers([...new Set(users)]);
      })
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          void (async () => {
            await room.track({
              user_name: userData?.user_display_name,
            });
          })();
        }
      });

    return () => {
      void room.unsubscribe();
    };
  }, []);

  if (userData?.user_team_name) {
    return (
      <div className="fixed bottom-4 right-4 z-[50] flex">
        {currentUsers.map((user, i) => (
          <HoverCard key={`user-${i}`} openDelay={0} closeDelay={0}>
            <HoverCardTrigger asChild>
              <Avatar>
                <AvatarFallback>{user[0]}</AvatarFallback>
              </Avatar>
            </HoverCardTrigger>
            <HoverCardContent className="mr-4 w-auto p-2">
              <p className="text-sm">{user} is here</p>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    );
  }
}
