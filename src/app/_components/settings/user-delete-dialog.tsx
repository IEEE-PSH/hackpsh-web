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
import { toast } from "../ui/use-toast";
import { type Dispatch, type SetStateAction } from "react";
import { trpc } from "@/app/_trpc/react";
import { type TUserInfo } from "@/server/dao/user";
import { useRouter } from "next/navigation";

type UserDeleteDialogProps = {
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  targetUserUUID: string;
  userData: TUserInfo;
};

export default function UserDeleteDialog({
  dialogOpen,
  setDialogOpen,
  targetUserUUID,
  userData,
}: UserDeleteDialogProps) {
  const router = useRouter();
  const utils = trpc.useContext();
  const deleteUserMutation = trpc.user.delete_user.useMutation({
    onSuccess: () => {
      void utils.user.get_users.invalidate();
      router.refresh();
      setDialogOpen(false);
      toast({
        variant: "success",
        title: "User deleted.",
        duration: 4000,
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

  async function deleteUser() {
    try {
      await deleteUserMutation.mutateAsync({
        user_uuid: userData!.user_uuid,
        target_uuid: targetUserUUID,
        authorization_check: true,
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
            This action cannot be undone. This will permanently delete the user
            {"'"}s acount and data from the platform.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" onClick={() => deleteUser()}>
            Delete user permanently
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
