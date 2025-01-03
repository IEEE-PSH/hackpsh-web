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
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "../ui/use-toast";
import { trpc } from "@/app/_trpc/react";
import { siteConfig } from "@/app/_config/site";

export default function TeamLeaveDialog({
  userUUID,
  getTeams,
}: {
  userUUID: string;
  getTeams?: () => void;
}) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const router = useRouter();

  const leaveTeamMutation = trpc.team.leave_team.useMutation({
    onSuccess: () => {
      if (getTeams) getTeams();
      else router.refresh();
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

  const pathname = usePathname();
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        {pathname === siteConfig.paths.join_team ? (
          <Button variant="outline" className="ml-4">
            <DoorClosed className="mr-2 h-4 w-4" />
            <span className="text-nowrap">Leave team</span>
          </Button>
        ) : (
          <Button variant="outline" className="sm:ml-4">
            <span className="text-nowrap">Leave team</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            Leaving a team as leader will promote another member instead.
            Leaving a team as the only member will delete the team.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => leaveTeam()}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
