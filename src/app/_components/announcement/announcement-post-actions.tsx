import { serverTRPC } from "@/app/_trpc/server";
import { composeServerComponentClient } from "@/server/lib/supabase/server";
import { getUser } from "@/shared/supabase/auth";
import AnnouncementPostActionsButton from "./announcement-post-actions-button";

export default async function AnnouncementPostActions({
  postID,
}: {
  postID: number;
}) {
  const supabase = composeServerComponentClient();
  try {
    const user = await getUser(supabase);
    const { get_user_role } = await serverTRPC.user.get_user_role.query({
      user_uuid: user.id,
    });

    if (get_user_role !== "participant") {
      return (
        <AnnouncementPostActionsButton
          postID={postID}
          className="absolute top-4 self-end"
        />
      );
    }
  } catch (error) {
    console.log(error);
  }
}
