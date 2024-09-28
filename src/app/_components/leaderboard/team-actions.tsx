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
import TeamOptionsSheet from "./team-options-sheet";
import TeamInfoSheet from "./team-info-sheet";
import TeamDeleteDialog from "./team-delete-dialog";

export default function TeamActions({
  teamUUID,
  userData,
}: {
  teamUUID: string;
  userData: TUserInfo;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [infoSheetOpen, setInfoSheetOpen] = useState(false);
  const [editSheetOpen, setEditSheetOpen] = useState(false);

  return (
    <>
      {infoSheetOpen ? (
        <TeamInfoSheet
          sheetOpen={infoSheetOpen}
          setSheetOpen={setInfoSheetOpen}
          teamUUID={teamUUID}
        />
      ) : (
        <></>
      )}
      {editSheetOpen ? (
        <TeamOptionsSheet
          sheetOpen={editSheetOpen}
          setSheetOpen={setEditSheetOpen}
          teamUUID={teamUUID}
          userData={userData}
        />
      ) : (
        <></>
      )}
      <TeamDeleteDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        userData={userData}
        teamUUID={teamUUID}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {userData!.user_role !== "participant" ? (
            <>
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
              <DropdownMenuSeparator />
            </>
          ) : (
            <></>
          )}
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setInfoSheetOpen(!infoSheetOpen)}
          >
            <Info className="mr-2 h-4 w-4" type="destructive" />
            <span>Info</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
