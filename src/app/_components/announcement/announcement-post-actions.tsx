"use client";
import { type TUserRole } from "@/db/drizzle/startup_seed";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Ellipsis, Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/app/_config/site";
import AnnouncementPostDeleteDialog from "./announcement-post-delete-dialog";
import { useState } from "react";

export default function AnnouncementPostActions({
  postID,
}: {
  postID: number;
  userRole: TUserRole;
}) {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <AnnouncementPostDeleteDialog
        postID={postID}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-2"
          >
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => {
              router.push(siteConfig.paths.edit_post + "/" + postID);
            }}
            className="cursor-pointer"
          >
            <Pencil className="mr-2 h-4 w-4" />
            <span>Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setDialogOpen(!dialogOpen);
            }}
            className="cursor-pointer"
          >
            <Trash className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
