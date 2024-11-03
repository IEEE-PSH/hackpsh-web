import { type Database } from "@/db/drizzle";
import { app_user_profile } from "@/db/drizzle/schema";
import {
  type TUserOnboardingPhase,
  type TUserMajor,
  type TUserSchoolYear,
  type TUserRole,
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

export async function isUserOnTeam(db: Database, user_uuid: string) {
  try {
    const result = await db.query.app_user_profile.findFirst({
      columns: {
        user_team_uuid: true,
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

export async function deleteUser(
  db: Database,
  user_uuid: string,
  target_uuid: string,
) {
  const result = await getUserRole(db, user_uuid);
  if (result?.user_role !== "admin") {
    throw new TRPCError({
      message: "User must be an admin to delete users.",
      code: "UNAUTHORIZED",
    });
  }

  await db
    .delete(app_user_profile)
    .where(eq(app_user_profile.user_uuid, target_uuid));
}

export async function deleteUserSelf(db: Database, user_uuid: string) {
  await db
    .delete(app_user_profile)
    .where(eq(app_user_profile.user_uuid, user_uuid));
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

export async function getUserInfo(db: Database, user_uuid: string) {
  try {
    const result = await db.query.app_user_profile.findFirst({
      columns: {
        user_first_name: true,
        user_last_name: true,
        user_display_name: true,
        user_email_address: true,
        user_role: true,
        user_uuid: true,
        user_major: true,
        user_school_year: true,
        user_support_administrative: true,
        user_support_technical: true,
        user_team_uuid: true,
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

export async function isTeamLeader(db: Database, user_uuid: string) {
  try {
    const result = await db.query.app_user_profile.findFirst({
      columns: {
        user_team_leader: true,
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

export type TUserInfo = Awaited<ReturnType<typeof getUserInfo>>;

export async function getUserSettingsInfo(db: Database, user_uuid: string) {
  try {
    const result = await db.query.app_user_profile.findFirst({
      columns: {
        user_first_name: true,
        user_last_name: true,
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
export type TUserSettingsInfo = Awaited<ReturnType<typeof getUserSettingsInfo>>;

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
  user_first_name: string,
  user_last_name: string,
  user_display_name: string,
) {
  try {
    //find existing display name
    const existing_display_name = await getUserFromDisplayName(
      db,
      user_display_name,
    );

    //find self display name
    const self_display_name = await db.query.app_user_profile.findFirst({
      columns: {
        user_display_name: true,
      },
      where: (user_data, { eq }) => eq(user_data.user_uuid, user_uuid),
    });

    const onboarding_complete = await getUserOnboardingStatus(db, user_uuid);

    //if display name already exists and it is not the user's, then error
    if (
      existing_display_name?.user_display_name === user_display_name &&
      self_display_name?.user_display_name !== user_display_name
    ) {
      throw new BaseError({
        error_title: "Unavailable Display Name",
        error_desc: "This display name has already been taken.",
      });
    }

    await db
      .update(app_user_profile)
      .set({
        user_first_name,
        user_last_name,
        user_display_name,
        user_onboarding_phase: onboarding_complete?.user_onboarding_complete
          ? "validate-onboarding"
          : "school-details",
      })
      .where(eq(app_user_profile.user_uuid, user_uuid));

    return {
      update_user_personal_details: true,
    };
  } catch (error) {
    console.log(error);
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

export async function updateUserSchoolDetails(
  db: Database,
  user_uuid: string,
  user_school_year: string,
  user_major: string,
) {
  try {
    const onboarding_complete = await getUserOnboardingStatus(db, user_uuid);

    await db
      .update(app_user_profile)
      .set({
        user_school_year,
        user_major,
        user_onboarding_phase: onboarding_complete?.user_onboarding_complete
          ? "validate-onboarding"
          : "support-us",
      })
      .where(eq(app_user_profile.user_uuid, user_uuid));

    return {
      update_user_school_details: true,
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

export async function updateUserRole(
  db: Database,
  user_uuid: string,
  target_uuid: string,
  target_role: string,
) {
  const result = await getUserRole(db, user_uuid);
  if (result?.user_role !== "admin") {
    throw new TRPCError({
      message: "User must be an admin to manage user roles.",
      code: "UNAUTHORIZED",
    });
  }

  await db
    .update(app_user_profile)
    .set({
      user_role: target_role,
    })
    .where(eq(app_user_profile.user_uuid, target_uuid));
}

export async function updateUserSettings(
  db: Database,
  user_uuid: string,
  user_first_name: string,
  user_last_name: string,
  user_display_name: string,
  user_school_year: TUserSchoolYear,
  user_major: TUserMajor,
  user_support_administrative: boolean,
  user_support_technical: boolean,
) {
  //error handling belongs in the below functions
  await updateUserPersonalDetails(
    db,
    user_uuid,
    user_first_name,
    user_last_name,
    user_display_name,
  );
  await updateUserSchoolDetails(db, user_uuid, user_school_year, user_major);
  await updateUserSupport(
    db,
    user_uuid,
    user_support_administrative,
    user_support_technical,
  );
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

export type TUserSupportInfo = Awaited<ReturnType<typeof getUserSupportInfo>>;

export async function getUserOnboardingFields(db: Database, user_uuid: string) {
  try {
    const user_profile = await db.query.app_user_profile.findFirst({
      columns: {
        user_first_name: true,
        user_last_name: true,
        user_display_name: true,
        user_major: true,
        user_school_year: true,
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

export async function getUsers(db: Database, role: TUserRole) {
  try {
    const result = await db
      .select({
        user_display_name: app_user_profile.user_display_name,
        user_email_address: app_user_profile.user_email_address,
        user_role: app_user_profile.user_role,
        user_uuid: app_user_profile.user_uuid,
      })
      .from(app_user_profile)
      .where(eq(app_user_profile.user_role, role));

    return result;
  } catch (error) {
    throw new TRPCError({
      message: "The database has encountered some issues.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}

export type AllUsers = Awaited<ReturnType<typeof getUsers>>;
export type User = AllUsers[number];

export async function getUserTeamInfo(db: Database, user_uuid: string) {
  try {
    const teamUUID = await db.query.app_user_profile.findFirst({
      columns: { user_team_uuid: true },
      where: (user_data, { eq }) => eq(user_data.user_uuid, user_uuid),
    });

    const teamGeneralInfo = await db.query.app_team.findFirst({
      columns: {
        team_uuid: true,
        team_name: true,
        team_join_code: true,
        team_points: true,
        team_points_additive: true,
      },
      where: (team_data, { eq }) =>
        eq(team_data.team_uuid, teamUUID!.user_team_uuid!),
    });

    const teamMembers = await db.query.app_user_profile.findMany({
      columns: {
        user_display_name: true,
      },
      where: (user_data, { eq }) =>
        eq(user_data.user_team_uuid, teamUUID!.user_team_uuid!),
    });

    return {
      team_uuid: teamGeneralInfo!.team_uuid,
      team_name: teamGeneralInfo!.team_name,
      team_join_code: teamGeneralInfo!.team_join_code,
      team_points: teamGeneralInfo!.team_points,
      team_total_points:
        teamGeneralInfo!.team_points + teamGeneralInfo!.team_points_additive,
      team_members: teamMembers,
    };
  } catch (error) {
    throw new TRPCError({
      message: "The database has encountered some issues.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}

export type TUserTeamInfo = Awaited<ReturnType<typeof getUserTeamInfo>>;

export async function updateTeamLeader(
  db: Database,
  user_uuid: string,
  isLeader: boolean,
) {
  try {
    await db
      .update(app_user_profile)
      .set({
        user_team_leader: isLeader,
      })
      .where(eq(app_user_profile.user_uuid, user_uuid));
  } catch (error) {
    throw new TRPCError({
      message: "The database has encountered some issues.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}
