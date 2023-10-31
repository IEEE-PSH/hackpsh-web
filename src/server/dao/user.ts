import { BaseError } from "@/app/_lib/server-utils";
import { type Database } from "@/db/drizzle";
import { app_user_profile } from "@/db/drizzle/schema";

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
    throw new BaseError({
      error_title: "Database Error",
      error_desc: "Server was unable to query the database.",
    });
  }
}

export async function createUser(
  db: Database,
  user_uuid: string,
  user_email_address: string,
) {
  try {
    await db.insert(app_user_profile).values({
      user_uuid,
      user_email_address,
      user_onboarding_complete: false,
    });
  } catch (error) {
    throw new BaseError({
      error_title: "Database Error",
      error_desc: "Server was unable to perform this operation.",
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
    throw new BaseError({
      error_title: "Database Error",
      error_desc: "Server was unable to query the database.",
    });
  }
}
