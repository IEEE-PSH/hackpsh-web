"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { EllipsisVertical, Info, Pencil, Trash } from "lucide-react";
import { type TUserInfo } from "@/server/dao/user";
import { useState } from "react";

import UserInfoSheet from "./user-info-sheet";
import UserOptionsSheet from "./user-options-sheet";
import UserDeleteDialog from "./user-delete-dialog";

export default function UserActions({
  userData,
  targetUserUUID,
}: {
  userData: TUserInfo;
  targetUserUUID: string;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [infoSheetOpen, setInfoSheetOpen] = useState(false);
  const [editSheetOpen, setEditSheetOpen] = useState(false);

  return (
    <>
      {infoSheetOpen ? (
        <UserInfoSheet
          sheetOpen={infoSheetOpen}
          setSheetOpen={setInfoSheetOpen}
          targetUserUUID={targetUserUUID}
        />
      ) : (
        <></>
      )}
      {editSheetOpen ? (
        <UserOptionsSheet
          sheetOpen={editSheetOpen}
          setSheetOpen={setEditSheetOpen}
          targetUserUUID={targetUserUUID}
          userData={userData}
        />
      ) : (
        <></>
      )}
      <UserDeleteDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        userData={userData}
        targetUserUUID={targetUserUUID}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setInfoSheetOpen(!infoSheetOpen)}
          >
            <Info className="mr-2 h-4 w-4" type="destructive" />
            <span>Info</span>
          </DropdownMenuItem>
          {userData?.user_role !== "participant" ? (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => setEditSheetOpen(!editSheetOpen)}
              >
                <Pencil className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => setDialogOpen(!dialogOpen)}
              >
                <Trash className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </>
          ) : (
            <></>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
