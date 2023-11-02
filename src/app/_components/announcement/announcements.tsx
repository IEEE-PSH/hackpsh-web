import { serverTRPC } from "@/app/_trpc/server";
// import { AnnouncementPost } from "./announcement-post";

export async function Announcements() {
  const serverAnnouncementPosts = await serverTRPC.announcements.get_announcement_posts.query();

  // const postElements = serverAnnouncementPosts.map(
  //   announcementPostData =>
  //     <AnnouncementPost
  //       key={announcementPostData.announcement_uuid}
  //       postData={announcementPostData}
  //     />
  // );

  return (
    <p>{JSON.stringify(serverAnnouncementPosts)}</p>
  )
}
