import EditAnnouncementPostForm from "@/app/_components/forms/edit-announcement-post-form";
import { serverTRPC } from "@/app/_trpc/server";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Announcement | HackPSH",
  description: "Edit an announcement.",
};

export default async function EditAnnouncementPage({
  params,
}: {
  params: { postId: number };
}) {
  const postData = await serverTRPC.announcements.get_announcement_post.query({
    //this is so cursed
    announcement_id: parseInt(params.postId as unknown as string) as number,
  });

  return (
    <div className="container my-8 max-w-4xl">
      <h1 className="mb-6 text-2xl font-semibold">Edit Announcement</h1>
      <EditAnnouncementPostForm postData={postData} />
    </div>
  );
}
