"use client";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { trpc } from "@/app/_trpc/react";
import { toast } from "../ui/use-toast";
import { SheetClose } from "../ui/sheet";
import { useRouter } from "next/navigation";

export default function DeleteUserButton({
  userUUID,
  targetUUID,
  setSheetOpen,
}: {
  userUUID: string;
  targetUUID: string;
  setSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  async function deleteUser() {
    try {
      setSheetOpen(false);
      await deleteUserMutation.mutateAsync({
        user_uuid: userUUID,
        target_uuid: targetUUID,
      });
    } catch (err: unknown) {
      console.log(err);
    }
  }

  const router = useRouter();
  const utils = trpc.useContext();

  const deleteUserMutation = trpc.user.delete_user.useMutation({
    onSuccess: () => {
      router.refresh();
      void utils.user.get_users.invalidate();
      toast({
        variant: "success",
        title: "User Deleted!",
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

  return (
    <Dialog>
      <DialogTrigger>
        <Button type="button" variant="outline" className="w-32">
          Delete User
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the user
            {"'"}s account and data from the platform.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <SheetClose>
            <Button variant="destructive" onClick={() => deleteUser()}>
              Delete User Permanently
            </Button>
          </SheetClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
