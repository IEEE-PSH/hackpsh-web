import { type Database } from "@/db/drizzle";
import { app_announcement, app_user_profile } from "@/db/drizzle/schema";
import { TRPCError } from "@trpc/server";
import { desc, eq } from "drizzle-orm";

export async function getAnnouncements(db: Database) {
  try {
    const announcement_posts = await db
      .select({
        announcement_uuid: app_announcement.announcement_uuid,
        announcement_created_at: app_announcement.announcement_created_at,
        announcement_author_display_name: app_user_profile.user_display_name,
        announcement_title: app_announcement.announcement_title,
        announcement_content: app_announcement.announcement_content,
      })
      .from(app_announcement)
      .innerJoin(
        app_user_profile,
        eq(
          app_announcement.announcement_author_uuid,
          app_user_profile.user_uuid,
        ),
      )
      .orderBy(desc(app_announcement.announcement_created_at));

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
