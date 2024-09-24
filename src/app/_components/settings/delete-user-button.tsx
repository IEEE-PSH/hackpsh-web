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
import { useRouter } from "next/navigation";
import { SheetClose } from "../ui/sheet";

export default function DeleteUserButton({
  userUUID,
  targetUUID,
  sheetSetOpen,
}: {
  userUUID: string;
  targetUUID: string;
  sheetSetOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  async function deleteUser() {
    try {
      sheetSetOpen(false);
      await deleteUserMutation.mutateAsync({
        user_uuid: userUUID,
        target_uuid: targetUUID,
      });
    } catch (err: unknown) {
      console.log(err);
    }
  }

  const router = useRouter();

  const deleteUserMutation = trpc.user.delete_user.useMutation({
    onSuccess: () => {
      router.refresh();
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
