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
import { getUser } from "@/shared/supabase/auth";
import { trpc } from "@/app/_trpc/react";
import { toast } from "../ui/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/_lib/supabase/client";

export default function DeleteAllTeamsDialog() {
  const router = useRouter();

  const deleteAllTeamsMutation = trpc.event.delete_all_teams.useMutation({
    onSuccess: () => {
      setDialogOpen(false);
      router.refresh();
      toast({
        variant: "success",
        title: "Teams deleted.",
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

  async function deleteAllTeams() {
    try {
      const supabase = createClient();
      const user = await getUser(supabase);

      await deleteAllTeamsMutation.mutateAsync({
        user_uuid: user.id,
      });
    } catch (err: unknown) {
      console.log(err);
    }
  }

  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="ml-auto w-full sm:w-auto">
          Delete all teams
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete all teams
            from the platform.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={async () => {
              await deleteAllTeams();
            }}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
