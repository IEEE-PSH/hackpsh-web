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
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { getUser } from "@/shared/supabase/auth";
import { trpc } from "@/app/_trpc/react";
import { toast } from "../ui/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/app/_config/site";

export default function DeleteChallengeDialog({
  challengeId,
}: {
  challengeId: number;
}) {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const deleteChallengeMutation = trpc.challenges.delete_challenge.useMutation({
    onSuccess: () => {
      setDialogOpen(false);
      router.replace(siteConfig.paths.challenges);
      router.refresh();
      toast({
        variant: "success",
        title: "Challenge deleted.",
        duration: 4000,
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Oops, Something Went Wrong!",
        description:
          "If you've encountered an issue, please contact our event administrators for assistance. We apologize for any inconvenience and will resolve it promptly.",
        duration: 6000,
      });
    },
  });

  async function deleteChallenge() {
    try {
      const user = await getUser(supabase);

      await deleteChallengeMutation.mutateAsync({
        user_uuid: user.id,
        challenge_id: challengeId,
      });
    } catch (err: unknown) {
      console.log(err);
    }
  }

  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="secondary"
          className="w-full px-8 sm:w-auto"
        >
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the
            challenge from the platform. Teams that have solved this challenge
            will not have these points removed.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={async () => {
              await deleteChallenge();
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
