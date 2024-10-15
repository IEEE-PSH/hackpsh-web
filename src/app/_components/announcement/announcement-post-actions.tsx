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
import Link from "next/link";

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
          <Button variant="ghost" size="icon" className="-m-2">
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href={siteConfig.paths.edit_post + "/" + postID}>
              <Pencil className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </Link>
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
