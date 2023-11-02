import { Database } from "@/db/drizzle";
import { app_announcement } from "@/db/drizzle/schema";
import { TRPCError } from "@trpc/server";

export async function getAnnouncements(db: Database) {
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

export async function writePost(
  db: Database,
  author_uuid: string,
  content: string,
) {
  try {
    await db.insert(app_announcement).values({
      announcement_author: author_uuid,
      announcement_content: content,
    });
  } catch (error) {
    throw new TRPCError({
      message: "The database has encountered some issues.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}
export type Announcements = Awaited<ReturnType<typeof getAnnouncements>>;
export type Post = Announcements[number];
