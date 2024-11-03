"use client";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { trpc } from "@/app/_trpc/react";
import { toast } from "../ui/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TeamPromoteUserDialog({
  userUUID,
  targetUUID,
}: {
  userUUID: string;
  targetUUID: string;
}) {
  const router = useRouter();

  const promoteUserMutation = trpc.team.update_team_leader.useMutation({
    onSuccess: () => {
      setDialogOpen(false);
      router.refresh();
      toast({
        variant: "default",
        title: "Team leader updated.",
        duration: 4000,
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Oops, something went wrong!",
        description:
          "If you've encountered an issue, please contact our event administrators for assistance. We apologize for any inconvenience and will resolve it promptly.",
        duration: 6000,
      });
    },
  });

  async function promoteUser() {
    try {
      await promoteUserMutation.mutateAsync({
        user_uuid: userUUID,
        is_team_leader: false,
        target_uuid: targetUUID,
      });
    } catch (err: unknown) {
      console.log(err);
    }
  }

  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="ml-4 h-8">
          Promote
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            Promoting this member as team leader means you will no longer be
            team leader.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={async () => {
              await promoteUser();
            }}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
