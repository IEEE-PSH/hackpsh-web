import { type Database } from "@/db/drizzle";
import { app_user_profile } from "@/db/drizzle/schema";
import type { TUserSchoolYear, TUserMajor } from "@/db/drizzle/startup_seed";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";

export async function updateUserPersonalDetails(
  db: Database,
  user_uuid: string,
  user_display_name: string,
  user_school_year: TUserSchoolYear,
  user_major: TUserMajor,
) {
  try {
    await db
      .update(app_user_profile)
      .set({
        user_display_name,
        user_school_year,
        user_major,
      })
      .where(eq(app_user_profile.user_uuid, user_uuid));

    return {
      update_user_personal_details: true,
    };
  } catch (error) {
    throw new TRPCError({
      message: "The database has encountered some issues.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}
