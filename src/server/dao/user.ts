import { type Database } from "@/db/drizzle";
import { app_user_profile } from "@/db/drizzle/schema";
import { TUserMajor, TUserSchoolYear } from "@/db/drizzle/startup_seed";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";

export async function getUserOnboardingStatus(db: Database, user_uuid: string) {
  try {
    const result = await db.query.app_user_profile.findFirst({
      columns: {
        user_onboarding_complete: true,
      },
      where: (user_data, { eq }) => eq(user_data.user_uuid, user_uuid),
    });

    return result;
  } catch (error) {
    throw new TRPCError({
      message: "The database has encountered some issues.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}

export async function createUser(
  db: Database,
  user_uuid: string,
  user_email_address: string,
) {
  try {
    // By Default, New records have the following fields set
    // user_onboarding_complete: false,
    // user_role: "participant",
    // user_onboarding_phase: "personal-details",
    await db.insert(app_user_profile).values({
      user_uuid,
      user_email_address,
    });
  } catch (error) {
    throw new TRPCError({
      message: "The database has encountered some issues.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}

export async function doesUserExist(db: Database, user_uuid: string) {
  try {
    const result = await db.query.app_user_profile.findFirst({
      columns: {
        user_uuid: true,
      },
      where: (user_data, { eq }) => eq(user_data.user_uuid, user_uuid),
    });

    return result;
  } catch (error) {
    throw new TRPCError({
      message: "The database has encountered some issues.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}

export async function getUserRole(db: Database, user_uuid: string) {
  try {
    const result = await db.query.app_user_profile.findFirst({
      columns: {
        user_role: true,
      },
      where: (user_data, { eq }) => eq(user_data.user_uuid, user_uuid),
    });

    return result;
  } catch (error) {
    throw new TRPCError({
      message: "The database has encountered some issues.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}

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
