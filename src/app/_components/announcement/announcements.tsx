import { serverTRPC } from "@/app/_trpc/server";
import { AnnouncementPost } from "./announcement-post";
import { composeServerComponentClient } from "@/server/lib/supabase/server";
import { getUser } from "@/shared/supabase/auth";
import { type TUserRole } from "@/db/drizzle/startup_seed";

export async function Announcements() {
  const serverAnnouncementPosts =
    await serverTRPC.announcements.get_announcement_posts.query();

  const supabase = composeServerComponentClient();
  const user = await getUser(supabase);
  const { get_user_role } = await serverTRPC.user.get_user_role.query({
    user_uuid: user.id,
  });

  const postElements: JSX.Element[] = [];

  serverAnnouncementPosts.forEach((announcementPostData) => {
    postElements.push(
      <AnnouncementPost
        key={announcementPostData.announcement_uuid}
        postData={announcementPostData}
        userRole={get_user_role as unknown as TUserRole}
      />,
    );
  });

  if (postElements.length > 0)
    return <div className="space-y-4">{postElements}</div>;
  else
    return (
      <p className="mx-auto text-center text-muted-foreground">
        No announcements yet.
      </p>
    );
}
