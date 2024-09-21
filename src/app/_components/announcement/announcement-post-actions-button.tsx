"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Ellipsis, Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/app/_config/site";

//fix className declaration
export default function AnnouncementPostActions({
  postID,
  className,
}: {
  postID: number;
  className: string;
}) {
  const router = useRouter();

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => {
              router.push(siteConfig.paths.announcements + "/edit/" + postID);
            }}
            className="cursor-pointer"
          >
            <Pencil className="mr-2 h-4 w-4" />
            <span>Edit</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            <Trash className="mr-2 h-4 w-4" type="destructive" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
