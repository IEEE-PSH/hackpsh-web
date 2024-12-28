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

export type TUserTracker = string[];
export type TPresenceState = Record<
  string,
  { user_name: string; presence_ref: string }[]
>;

export default function ChallengeUsersStatus({
  userDisplayName,
  challengeId,
  teamName,
}: {
  userDisplayName: string;
  challengeId: number;
  teamName: string | null;
}) {
  const [currentUsers, setCurrentUsers] = useState<TUserTracker>([]);

  useEffect(() => {
    if (!teamName) return;
    const supabase = createClient();
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
        setCurrentUsers([...new Set(users)]);
      })
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          void (async () => {
            await room.track({
              user_name: userDisplayName,
            });
          })();
        }
      });

    return () => {
      void room.unsubscribe();
    };
  }, []);

  if (teamName) {
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
