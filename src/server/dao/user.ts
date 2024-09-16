import { type Database } from "@/db/drizzle";
import { app_user_profile } from "@/db/drizzle/schema";
import {
  type TUserOnboardingPhase,
  type TUserMajor,
  type TUserSchoolYear,
} from "@/db/drizzle/startup_seed";
import { BaseError } from "@/shared/error";
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

export async function getUserDropdownInfo(db: Database, user_uuid: string) {
  try {
    const result = await db.query.app_user_profile.findFirst({
      columns: {
        user_display_name: true,
        user_email_address: true,
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

export async function getUserSettingsInfo(db: Database, user_uuid: string) {
  try {
    const result = await db.query.app_user_profile.findFirst({
      columns: {
        user_display_name: true,
        user_email_address: true,
        user_school_year: true,
        user_major: true,
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

export async function getUserOnboardingPhase(db: Database, user_uuid: string) {
  try {
    const result = await db.query.app_user_profile.findFirst({
      columns: {
        user_onboarding_phase: true,
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

export async function getUserFromDisplayName(
  db: Database,
  user_display_name: string,
) {
  try {
    const user_from_display_name = await db.query.app_user_profile.findFirst({
      columns: {
        user_display_name: true,
      },
      where: (user_data, { eq }) =>
        eq(user_data.user_display_name, user_display_name),
    });

    return user_from_display_name;
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
    const user_from_display_name = await getUserFromDisplayName(
      db,
      user_display_name,
    );

    const user_display_name_from_uuid =
      await db.query.app_user_profile.findFirst({
        columns: {
          user_display_name: true,
        },
        where: (user_data, { eq }) => eq(user_data.user_uuid, user_uuid),
      });

    const onboarding_complete = await getUserOnboardingStatus(db, user_uuid);

    if (
      user_from_display_name?.user_display_name === user_display_name &&
      user_display_name_from_uuid?.user_display_name !== user_display_name
    ) {
      throw new BaseError({
        error_title: "Unavailable Display Name",
        error_desc: "This display name has already been taken.",
      });
    }

    await db
      .update(app_user_profile)
      .set({
        user_display_name,
        user_school_year,
        user_major,
        user_onboarding_phase: onboarding_complete
          ? "validate-onboarding"
          : "team-creation",
      })
      .where(eq(app_user_profile.user_uuid, user_uuid));

    return {
      update_user_personal_details: true,
    };
  } catch (error) {
    if (error instanceof BaseError) {
      throw new TRPCError({
        message: error.description!,
        code: "CONFLICT",
      });
    }
    throw new TRPCError({
      message: "The database has encountered some issues.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}

export async function updateUserSupport(
  db: Database,
  user_uuid: string,
  user_support_administrative: boolean,
  user_support_technical: boolean,
) {
  try {
    await db
      .update(app_user_profile)
      .set({
        user_support_administrative,
        user_support_technical,
        user_onboarding_phase: "validate-onboarding",
      })
      .where(eq(app_user_profile.user_uuid, user_uuid));
  } catch (error) {
    throw new TRPCError({
      message: "The database has encountered some issues.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}

export async function getUserSupportInfo(db: Database, user_uuid: string) {
  try {
    const user_support_info = await db.query.app_user_profile.findFirst({
      columns: {
        user_support_administrative: true,
        user_support_technical: true,
      },
      where: (user_data, { eq }) => eq(user_data.user_uuid, user_uuid),
    });

    return user_support_info;
  } catch (error) {
    throw new TRPCError({
      message: "The database has encountered some issues.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}

export async function getUserOnboardingFields(db: Database, user_uuid: string) {
  try {
    const user_profile = await db.query.app_user_profile.findFirst({
      columns: {
        user_display_name: true,
        user_major: true,
        user_school_year: true,
        user_team_uuid: true,
        user_support_administrative: true,
        user_support_technical: true,
      },
      where: (user_data, { eq }) => eq(user_data.user_uuid, user_uuid),
    });

    return user_profile;
  } catch (error) {
    throw new TRPCError({
      message: "The database has encountered some issues.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}

export async function updateUserOnboardingPhase(
  db: Database,
  user_uuid: string,
  user_onboarding_phase: TUserOnboardingPhase,
) {
  try {
    await db
      .update(app_user_profile)
      .set({
        user_onboarding_phase,
      })
      .where(eq(app_user_profile.user_uuid, user_uuid));
  } catch (error) {
    throw new TRPCError({
      message: "The database has encountered some issues.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}

export async function updateUserOnboardingStatus(
  db: Database,
  user_uuid: string,
  user_onboarding_complete: boolean,
) {
  try {
    await db
      .update(app_user_profile)
      .set({
        user_onboarding_complete,
      })
      .where(eq(app_user_profile.user_uuid, user_uuid));
  } catch (error) {
    throw new TRPCError({
      message: "The database has encountered some issues.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}
