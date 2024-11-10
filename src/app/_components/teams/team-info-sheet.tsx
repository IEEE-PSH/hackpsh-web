"use client";

import { trpc } from "@/app/_trpc/react";
import { Sheet, SheetContent, SheetHeader } from "../ui/sheet";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import { Skeleton } from "../ui/skeleton";
import { toast } from "../ui/use-toast";

type TeamInfoSheetProps = {
  sheetOpen: boolean;
  setSheetOpen: Dispatch<SetStateAction<boolean>>;
  teamUUID: string;
  getTeams: () => void;
};

export default function TeamInfoSheet({
  sheetOpen,
  setSheetOpen,
  teamUUID,
  getTeams,
}: TeamInfoSheetProps) {
  const {
    data: teamData,
    refetch: getTeamData,
    isSuccess,
  } = trpc.team.get_team_info.useQuery(
    {
      team_uuid: teamUUID,
    },
    { enabled: false },
  );

  useEffect(() => {
    void checkTeamExists();
    setSheetOpen(true);
  }, [teamUUID]);

  const { refetch: checkTeamExists } = trpc.team.does_team_exist.useQuery(
    { team_uuid: teamUUID },
    {
      enabled: false,
      retry: false,
      onSuccess: (isTeam) => {
        if (isTeam) {
          void getTeamData();
        } else {
          setSheetOpen(false);
          void getTeams();
          toast({
            variant: "default",
            description: `Team no longer exists.`,
            duration: 3000,
          });
        }
      },
    },
  );

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetContent>
        <SheetHeader className="text-xl">
          {isSuccess ? (
            <h1 className="text-left">Team {teamData?.team_name}</h1>
          ) : (
            <Skeleton className="my-1 h-5 w-52" />
          )}
        </SheetHeader>

        {isSuccess ? (
          teamData.team_members.map((member) => (
            <p className="text-muted-foreground" key={member.user_display_name}>
              {member.user_display_name}
            </p>
          ))
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
