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
import { useState, type Dispatch, type SetStateAction } from "react";
import { trpc } from "@/app/_trpc/react";
import { type TUserInfo } from "@/server/dao/user";
import { useRouter } from "next/navigation";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Trash } from "lucide-react";

type TeamOptionsSheet = {
  teamUUID: string;
  userData: TUserInfo;
};

export default function TeamDeleteDialog({
  teamUUID,
  userData,
}: TeamOptionsSheet) {
  const router = useRouter();
  const deleteTeamMutation = trpc.team.delete_team.useMutation({
    onSuccess: () => {
      router.refresh();
      setDialogOpen(false);
      toast({
        variant: "success",
        title: "Team deleted.",
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

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost" className="h-8 w-8">
          <Trash className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will kick all members from the
            team and delete the team from the platform.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" onClick={() => deleteTeam()}>
            Delete permanently
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
