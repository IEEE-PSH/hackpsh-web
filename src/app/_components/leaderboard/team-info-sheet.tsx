"use client";

import { trpc } from "@/app/_trpc/react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { useState, type Dispatch, type SetStateAction } from "react";
import { Skeleton } from "../ui/skeleton";

type TeamInfoSheet = {
  sheetOpen: boolean;
  setSheetOpen: Dispatch<SetStateAction<boolean>>;
  teamUUID: string;
};

export default function TeamInfoSheet({
  sheetOpen,
  setSheetOpen,
  teamUUID,
}: TeamInfoSheet) {
  const { data: teamData, isSuccess } = trpc.team.get_team_info.useQuery({
    team_uuid: teamUUID,
  });

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetContent>
        <SheetHeader className="text-xl">
          {isSuccess ? (
            <h1>Team {teamData?.team_name}</h1>
          ) : (
            <Skeleton className="my-1 h-5 w-52" />
          )}
        </SheetHeader>

        {isSuccess ? (
          <>
            {teamData.team_members.length > 0 ? (
              teamData.team_members.map((member) => (
                <p
                  className="text-muted-foreground"
                  key={member.user_display_name}
                >
                  {member.user_display_name}
                </p>
              ))
            ) : (
              <p className="text-muted-foreground">No team members found :/</p>
            )}
          </>
        ) : (
          <>
            <Skeleton className="my-1 h-4 w-56" />
            <Skeleton className="my-1 h-4 w-56" />
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
