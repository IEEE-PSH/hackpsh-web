import { serverTRPC } from "@/app/_trpc/server";
import { AnnouncementPost } from "./announcement-post";

export default async function Announcements() {
  const serverAnnouncementPosts = await serverTRPC.announcements.get_announcement_posts.query();

  return (
    <p>{JSON.stringify(serverAnnouncementPosts)}</p>
  )
}
