"use client";
import { TUserRole } from "@/db/drizzle/startup_seed";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { EllipsisVertical, Info, Pencil, Trash } from "lucide-react";
import { TUserInfo } from "@/server/dao/user";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";

export default function TeamActions({
  teamUUID,
  userData,
}: {
  teamUUID: string;
  userData: TUserInfo;
}) {
  return (
    <div>
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="cursor-pointer">
              <Info className="mr-2 h-4 w-4" type="destructive" />
              <span>Info</span>
            </DropdownMenuItem>
            {userData?.user_role !== "participant" ? (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <DialogTrigger className="flex">
                    <Trash className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DialogTrigger>
                </DropdownMenuItem>
              </>
            ) : (
              <></>
            )}
          </DropdownMenuContent>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete the
                team and its members from the platform.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="destructive">Delete Team Permanently</Button>
            </DialogFooter>
          </DialogContent>
        </DropdownMenu>
      </Dialog>
    </div>
  );
}
