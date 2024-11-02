"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { DoorClosed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "../ui/use-toast";
import { trpc } from "@/app/_trpc/react";

export default function TeamLeaveDialog({ userUUID }: { userUUID: string }) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const router = useRouter();

  const utils = trpc.useContext();
  const leaveTeamMutation = trpc.team.leave_team.useMutation({
    onSuccess: () => {
      router.refresh();
      utils.team.get_team_info.invalidate();
      setDialogOpen(false);
      toast({
        variant: "default",
        description: "Left team.",
        duration: 3000,
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

  async function leaveTeam() {
    try {
      await leaveTeamMutation.mutateAsync({
        user_uuid: userUUID,
      });
    } catch (err: unknown) {
      console.log(err);
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-4">
          <DoorClosed className="mr-2 h-4 w-4" />
          <span className="text-nowrap">Leave team</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            You can leave to join other teams.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => leaveTeam()}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
