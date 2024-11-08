"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { useState } from "react";
import JoinTeamForm from "./join-team-form";

type TeamJoinDialogProps = {
  teamName: string;
  getTeams: () => void;
  getUserClientData: () => void;
};

export default function TeamJoinDialog({
  teamName,
  getTeams,
  getUserClientData,
}: TeamJoinDialogProps) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="ml-4 h-8 gap-2">Join</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Join a team</DialogTitle>
        </DialogHeader>
        <JoinTeamForm
          setDialogOpen={setDialogOpen}
          teamName={teamName}
          getTeams={getTeams}
          getUserClientData={getUserClientData}
        />
      </DialogContent>
    </Dialog>
  );
}
