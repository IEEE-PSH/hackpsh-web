import { serverTRPC } from "@/app/_trpc/server";
import { AnnouncementPost } from "./announcement-post";

export async function Announcements() {
  const serverAnnouncementPosts = await serverTRPC.announcements.get_announcement_posts.query();

  const postElements: JSX.Element[] = [];

  serverAnnouncementPosts.forEach(
    announcementPost =>
      <AnnouncementPost
        key={announcementPost.announcement_uuid}
        postData={announcementPost}
      />
  );

  return (<div className="space-y-6">{postElements}</div>);
}
