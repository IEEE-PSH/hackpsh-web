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

export default function DeleteSelfAccountDialog() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const deleteSelfAccountMutation = trpc.user.delete_user_self.useMutation({
    onSuccess: async () => {
      setDialogOpen(false);
      await supabase.auth.signOut();
      router.push(siteConfig.paths.home);
      router.refresh();
      toast({
        variant: "success",
        title: "Account Deleted!",
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

  async function deleteSelfAccount() {
    try {
      const user = await getUser(supabase);

      await deleteSelfAccountMutation.mutateAsync({
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
        <Button variant="secondary" className="w-full flex-shrink-0 sm:w-auto">
          Delete Account
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
              await deleteSelfAccount();
            }}
          >
            Delete Account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
