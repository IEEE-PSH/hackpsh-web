import { type Database } from "@/db/drizzle";
import { app_announcement, app_challenges, app_user_profile } from "@/db/drizzle/schema";
import { TRPCError } from "@trpc/server";
import { desc, eq } from "drizzle-orm";
import { getUserRole } from "./user";

// export async function getAnnouncements(db: Database) {
//   try {
//     const announcement_posts = await db
//       .select({
//         announcement_uuid: app_announcement.announcement_uuid,
//         announcement_created_at: app_announcement.announcement_created_at,
//         announcement_author_display_name: app_user_profile.user_display_name,
//         announcement_title: app_announcement.announcement_title,
//         announcement_content: app_announcement.announcement_content,
//         announcement_id: app_announcement.announcement_id,
//       })
//       .from(app_announcement)
//       .leftJoin(
//         app_user_profile,
//         eq(
//           app_announcement.announcement_author_uuid,
//           app_user_profile.user_uuid,
//         ),
//       )
//       .orderBy(desc(app_announcement.announcement_created_at));

//     return announcement_posts;
//   } catch (error) {
//     throw new TRPCError({
//       message: "The database has encountered some issues.",
//       code: "INTERNAL_SERVER_ERROR",
//     });
//   }
// }

export async function createChallenge(
  db: Database,
  user_uuid: string,
  title: string,
  difficulty:string,
  description: string,
  function_header: string,
  example_input: string,
  example_output:string,
  explanation:string,
  testcase_input_1:string,
  testcase_output_1:string,
  testcase_input_2:string,
  testcase_output_2:string
) {
  const result = await getUserRole(db, user_uuid);
  if (result?.user_role === "participant") {
    throw new TRPCError({
      message: "User must be an officer or admin to delete announcements.",
      code: "UNAUTHORIZED",
    });
  }

  try {
    await db.insert(app_challenges).values({
      challenge_title: title,
      challenge_difficulty: difficulty,
      challenge_description: description,
      challenge_function_header: function_header,
      challenge_example_input: example_input,
      challenge_example_output: example_output,
      challenge_explanation: explanation,
      challenge_testcase_input_1: testcase_input_1,
      challenge_testcase_output_1: testcase_output_1,
      challenge_testcase_input_2: testcase_input_2,
      challenge_testcase_output_2: testcase_output_2
    });
  } catch (error) {
    throw new TRPCError({
      message: "The database has encountered some issues.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}

// export async function getAnnouncementPost(db: Database, id: number) {
//   try {
//     const announcement_post = await db.query.app_announcement.findFirst({
//       columns: {
//         announcement_uuid: true,
//         announcement_created_at: true,
//         announcement_author_uuid: true,
//         announcement_title: true,
//         announcement_content: true,
//         announcement_id: true,
//       },
//       where: (post_data, { eq }) => eq(post_data.announcement_id, id),
//     });

//     return announcement_post;
//   } catch (error) {
//     throw new TRPCError({
//       message: "The database has encountered some issues.",
//       code: "INTERNAL_SERVER_ERROR",
//     });
//   }
// }

// export async function updateAnnouncementPost(
//   db: Database,
//   user_uuid: string,
//   announcement_id: number,
//   announcement_title: string,
//   announcement_content: string,
// ) {
//   const result = await getUserRole(db, user_uuid);
//   if (result?.user_role === "participant") {
//     throw new TRPCError({
//       message: "User must be an officer or admin to edit announcements.",
//       code: "UNAUTHORIZED",
//     });
//   }

//   await db
//     .update(app_announcement)
//     .set({
//       announcement_title,
//       announcement_content,
//     })
//     .where(eq(app_announcement.announcement_id, announcement_id));

//   return {
//     update_announcement_post: true,
//   };
// }

// export async function deleteAnnouncementPost(
//   db: Database,
//   user_uuid: string,
//   announcement_id: number,
// ) {
//   const result = await getUserRole(db, user_uuid);
//   if (result?.user_role === "participant") {
//     throw new TRPCError({
//       message: "User must be an officer or admin to delete announcements.",
//       code: "UNAUTHORIZED",
//     });
//   }

//   await db
//     .delete(app_announcement)
//     .where(eq(app_announcement.announcement_id, announcement_id));

//   return {
//     update_announcement_post: true,
//   };
// }

// export type Announcements = Awaited<ReturnType<typeof getAnnouncements>>;
// export type AnnouncementPost = Announcements[number];
