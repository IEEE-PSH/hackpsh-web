"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { getUser } from "@/shared/supabase/auth";
import { trpc } from "@/app/_trpc/react";
import { type Dispatch, type SetStateAction } from "react";

export default function AnnouncementPostDeleteDialog({
  postID,
  dialogOpen,
  setDialogOpen,
  className,
}: {
  postID: number;
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
} & React.HTMLAttributes<HTMLDivElement>) {
  const router = useRouter();

  const announcementMutation =
    trpc.announcements.delete_announcement_post.useMutation({
      onSuccess: () => {
        setDialogOpen(false);
        toast({
          variant: "success",
          title: "Announcement deleted.",
          duration: 4000,
        });
        router.refresh();
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

  async function deletePost(postID: number) {
    try {
      const supabase = createClientComponentClient();
      const user = await getUser(supabase);

      await announcementMutation.mutateAsync({
        user_uuid: user.id,
        announcement_id: postID,
      });
    } catch (err: unknown) {
      console.log(err);
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the post.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={async () => {
              await deletePost(postID);
            }}
          >
            Delete Post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
