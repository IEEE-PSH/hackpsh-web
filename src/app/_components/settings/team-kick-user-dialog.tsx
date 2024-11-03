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

export default function TeamKickUserDialog({
  targetUUID,
}: {
  targetUUID: string;
}) {
  const router = useRouter();

  const kickUserMutation = trpc.team.kick_user.useMutation({
    onSuccess: async () => {
      setDialogOpen(false);
      router.refresh();
      toast({
        variant: "default",
        title: "Kicked member from the team.",
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

  async function kickUser() {
    try {
      await kickUserMutation.mutateAsync({
        user_uuid: targetUUID,
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
          Kick
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This user can simply rejoin your team if you do not change the join
            code.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={async () => {
              await kickUser();
            }}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
