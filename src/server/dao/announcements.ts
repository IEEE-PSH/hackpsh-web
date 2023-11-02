import { type Database } from "@/db/drizzle";
import { app_announcement } from "@/db/drizzle/schema";
import { TRPCError } from "@trpc/server";

export async function getAnnouncements(db: Database) {
  try {
    const announcement_posts = await db.select().from(app_announcement);

    return announcement_posts;
  } catch (error) {
    throw new TRPCError({
      message: "The database has encountered some issues.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}

export async function createAnnouncementPost(
  db: Database,
  author_uuid: string,
  title: string,
  content: string,
) {
  try {
    await db.insert(app_announcement).values({
      announcement_author_uuid: author_uuid,
      announcement_content: content,
      announcement_title: title,
    });
  } catch (error) {
    throw new TRPCError({
      message: "The database has encountered some issues.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}

export type Announcements = Awaited<ReturnType<typeof getAnnouncements>>;
export type AnnouncementPost = Announcements[number];
