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
import { toast } from "../ui/use-toast";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { getUser } from "@/shared/supabase/auth";
import { trpc } from "@/app/_trpc/react";

export default function AnnouncementPostActions({
  postID,
  className,
}: {
  postID: number;
} & React.HTMLAttributes<HTMLDivElement>) {
  const router = useRouter();

  const announcementMutation =
    trpc.announcements.delete_announcement_post.useMutation({
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Announcement Deleted!",
          description: "You have successfully deleted an announcement.",
          duration: 4000,
        });
        router.refresh();
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

  async function deletePost(postID: number) {
    try {
      const supabase = createClientComponentClient();
      const user = await getUser(supabase);

      await announcementMutation.mutateAsync({
        user_uuid: user.id,
        announcement_id: postID,
      });
    } catch (err: unknown) {
      console.log(err);
    }
  }

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
              router.push(siteConfig.paths.edit_post + "/" + postID);
            }}
            className="cursor-pointer"
          >
            <Pencil className="mr-2 h-4 w-4" />
            <span>Edit</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              deletePost(postID);
            }}
          >
            <Trash className="mr-2 h-4 w-4" type="destructive" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
