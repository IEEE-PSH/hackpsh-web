"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { Plus } from "lucide-react";
import CreateTeamForm from "./create-team-form";
import { useState } from "react";

export default function TeamCreateDialog() {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-4 gap-2">
          <Plus className="h-4 w-4 " />
          <span className="text-nowrap">Create team</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a team</DialogTitle>
        </DialogHeader>
        <CreateTeamForm setDialogOpen={setDialogOpen} />
      </DialogContent>
    </Dialog>
  );
}
