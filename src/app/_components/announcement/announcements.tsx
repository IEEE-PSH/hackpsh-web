import { serverTRPC } from "@/app/_trpc/server";

export default async function Announcements() {
  const serverAnnouncementPosts = await serverTRPC.announcements.get_announcement_posts.query();

  return (
    <>

    </>
  );
}
