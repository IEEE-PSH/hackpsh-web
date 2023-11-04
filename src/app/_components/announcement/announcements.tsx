import { serverTRPC } from "@/app/_trpc/server";
import { AnnouncementPost } from "./announcement-post";

export async function Announcements() {
  const serverAnnouncementPosts = await serverTRPC.announcements.get_announcement_posts.query();

  const postElements: JSX.Element[] = [];

  serverAnnouncementPosts.forEach(
    announcementPostData =>
      postElements.push(
        <AnnouncementPost
          key={announcementPostData.announcement_uuid}
          postData={announcementPostData}
        />
      )
  );

  return (<div className="space-y-6">{postElements}</div>);
}
