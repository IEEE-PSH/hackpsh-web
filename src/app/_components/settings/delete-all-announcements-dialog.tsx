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

export default function DeleteAllAnnouncementsDialog() {
  const router = useRouter();

  const announcementMutation = trpc.event.delete_all_announcements.useMutation({
    onSuccess: () => {
      setDialogOpen(false);
      router.refresh();
      toast({
        variant: "success",
        title: "Announcements deleted.",
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

  async function deleteAllAnnouncements() {
    try {
      const supabase = createClient();
      const user = await getUser(supabase);

      await announcementMutation.mutateAsync({
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
        <Button variant="secondary" className="w-full text-nowrap sm:w-auto">
          Delete all announcements
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete all
            announcements.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={async () => {
              await deleteAllAnnouncements();
            }}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
