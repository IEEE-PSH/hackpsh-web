import { type Database } from "@/db/drizzle";
import { app_announcement } from "@/db/drizzle/schema";
import { TRPCError } from "@trpc/server";

export async function getAnnouncementPosts(db: Database) {
  try {
    const result = await db.select().from(app_announcement);

    return result;
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
      announcement_author: author_uuid,
      announcement_content: content,
      // announcement_title: title,
    });
  } catch (error) {
    throw new TRPCError({
      message: "The database has encountered some issues.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}

export type Announcements = Awaited<ReturnType<typeof getAnnouncementPosts>>;
export type Post = Announcements[number];
