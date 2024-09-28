"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import { type Dispatch, type SetStateAction } from "react";
import { trpc } from "@/app/_trpc/react";
import { type TUserInfo } from "@/server/dao/user";

type TeamOptionsSheet = {
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  teamUUID: string;
  userData: TUserInfo;
};

export default function TeamDeleteDialog({
  dialogOpen,
  setDialogOpen,
  teamUUID,
  userData,
}: TeamOptionsSheet) {
  const deleteTeamMutation = trpc.team.delete_team.useMutation({
    onSuccess: () => {
      setDialogOpen(false);
      toast({
        variant: "success",
        title: "Team Deleted!",
        duration: 4000,
      });
    },
    onError: (error) => {
      toast({
        description: error.message,
        variant: "destructive",
        duration: 6000,
      });
    },
  });

  async function deleteTeam() {
    try {
      await deleteTeamMutation.mutateAsync({
        user_uuid: userData!.user_uuid,
        team_uuid: teamUUID,
      });
    } catch (err: unknown) {
      console.log(err);
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the team
            and its members from the platform.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" onClick={() => deleteTeam()}>
            Delete Team Permanently
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
