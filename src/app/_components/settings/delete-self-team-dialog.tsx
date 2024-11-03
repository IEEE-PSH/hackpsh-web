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
import { useState } from "react";
import { trpc } from "@/app/_trpc/react";
import { useRouter } from "next/navigation";
import { DialogTrigger } from "@radix-ui/react-dialog";

type DeleteSelfTeamDialogProps = {
  userUUID: string;
};

export default function DeleteSelfTeamDialog({
  userUUID,
}: DeleteSelfTeamDialogProps) {
  const router = useRouter();
  const deleteSelfTeamMutation = trpc.user.delete_team_self.useMutation({
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
      await deleteSelfTeamMutation.mutateAsync({
        user_uuid: userUUID,
      });
    } catch (err: unknown) {
      console.log(err);
    }
  }

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Delete team</Button>
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
