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

export default function DeleteAllParticipantsDialog() {
  const router = useRouter();

  const deleteAllParticipantsMutation =
    trpc.event.delete_all_participants.useMutation({
      onSuccess: () => {
        setDialogOpen(false);
        router.refresh();
        toast({
          variant: "success",
          title: "Participants deleted.",
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

  async function deleteAllParticipants() {
    try {
      const supabase = createClient();
      const user = await getUser(supabase);

      await deleteAllParticipantsMutation.mutateAsync({
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
          Delete all participants
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete all users
            with the participants role.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={async () => {
              await deleteAllParticipants();
            }}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
