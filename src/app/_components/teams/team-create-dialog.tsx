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
import { trpc } from "@/app/_trpc/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function TeamCreateDialog({ userRole }: { userRole: string }) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const { data: is_team_creation_enabled } =
    trpc.event.is_team_creation_enabled.useQuery();

  if (is_team_creation_enabled)
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

  if (userRole !== "participant") {
    return (
      <>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create a team</DialogTitle>
            </DialogHeader>
            <CreateTeamForm setDialogOpen={setDialogOpen} />
          </DialogContent>
        </Dialog>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Button
                  variant="outline"
                  className=" hover:none ml-4 gap-2 opacity-50"
                  onClick={() => setDialogOpen(true)}
                >
                  <Plus className="h-4 w-4" />
                  <span className="text-nowrap">Create team</span>
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Team creation is currently disabled for participants.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="cursor-default" asChild>
          <div>
            <Button
              variant="outline"
              className=" hover:none ml-4 gap-2"
              disabled
            >
              <Plus className="h-4 w-4" />
              <span className="text-nowrap">Create team</span>
            </Button>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Team creation is currently disabled for participants.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
