import { serverTRPC } from "@/app/_trpc/server";
import { MiniAnnouncementPost } from "./mini-announcement-post";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import { siteConfig } from "@/app/_config/site";

export async function MiniAnnouncements({}: React.HTMLAttributes<HTMLDivElement>) {
  const serverAnnouncementPosts =
    await serverTRPC.announcements.get_announcement_posts.query();

  const postElements: JSX.Element[] = [];

  serverAnnouncementPosts.forEach((announcementPostData, i) => {
    if (i < 3)
      postElements.push(
        <MiniAnnouncementPost
          key={announcementPostData.announcement_uuid}
          postData={announcementPostData}
          index={i}
          postsLength={serverAnnouncementPosts.length}
        />,
      );
  });

  return (
    <div className="mt-8 hidden lg:block">
      <Card className="w-80">
        <CardContent className="flex flex-col space-y-4 p-6">
          <div className="flex justify-between">
            <span className="text-xs uppercase text-muted-foreground">
              Recent Announcements
            </span>
            <Link
              href={siteConfig.paths.announcements}
              className="text-xs text-muted-foreground hover:underline"
            >
              View all
            </Link>
          </div>

          {postElements.length > 0 ? (
            postElements
          ) : (
            <p className="text-muted-foreground">No announcements</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
