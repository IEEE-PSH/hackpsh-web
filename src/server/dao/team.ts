import { type Database } from "@/db/drizzle";
import { app_team, app_user_profile } from "@/db/drizzle/schema";
import { BaseError } from "@/shared/error";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { getUserRole } from "./user";

export async function createTeam(
  db: Database,
  user_uuid: string,
  team_name: string,
  team_join_code: string,
) {
  try {
    const team_from_name = await getTeamFromName(db, team_name);

    if (team_from_name?.team_name) {
      throw new BaseError({
        error_title: "Team already exists.",
        error_desc:
          "Please pick a different team, as this team name is already taken.",
      });
    }

    await db.insert(app_team).values({
      team_name,
      team_join_code,
    });

    await joinTeam(db, user_uuid, team_name, team_join_code);
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

export async function updateTeam(
  db: Database,
  user_uuid: string,
  target_team_uuid: string,
  target_team_points_additive: number,
) {
  const role = await getUserRole(db, user_uuid);
  if (role?.user_role === "participant") {
    throw new TRPCError({
      message: "User must be an officer or admin to edit teams.",
      code: "UNAUTHORIZED",
    });
  }

  try {
    const result = await db
      .update(app_team)
      .set({
        team_points_additive: target_team_points_additive,
      })
      .where(eq(app_team.team_uuid, target_team_uuid));

    return result;
  } catch (error) {
    throw new TRPCError({
      message: "The database has encountered some issues.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}

export async function updateTeamDetails(
  db: Database,
  user_uuid: string,
  team_name: string,
  team_join_code: string,
) {
  try {
    //find existing team name
    const existing_team_name = await getTeamFromName(db, team_name);

    //find self team name
    const self_team_uuid = await db.query.app_user_profile.findFirst({
      columns: {
        user_team_uuid: true,
      },
      where: eq(app_user_profile.user_uuid, user_uuid),
    });

    const self_team_name = await db.query.app_team.findFirst({
      columns: {
        team_name: true,
      },
      where: eq(app_team.team_uuid, self_team_uuid!.user_team_uuid!),
    });

    //if existing team name is not the user's team name, then error
    if (
      existing_team_name?.team_name === team_name &&
      self_team_name?.team_name !== team_name
    ) {
      throw new BaseError({
        error_title: "Unavailable Team Name",
        error_desc: "This team name has already been taken.",
      });
    }

    //update team name and join code
    const team_uuid = await db.query.app_user_profile.findFirst({
      columns: { user_team_uuid: true },
      where: (user_data, { eq }) => eq(user_data.user_uuid, user_uuid),
    });
    await db
      .update(app_team)
      .set({
        team_name: team_name,
        team_join_code: team_join_code,
      })
      .where(eq(app_team.team_uuid, team_uuid!.user_team_uuid!));

    return {
      update_team_details: true,
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

export async function deleteTeam(
  db: Database,
  user_uuid: string,
  target_team_uuid: string,
) {
  const role = await getUserRole(db, user_uuid);
  if (role?.user_role === "participant") {
    throw new TRPCError({
      message: "User must be an officer or admin to delete teams.",
      code: "UNAUTHORIZED",
    });
  }

  try {
    const result = await db
      .delete(app_team)
      .where(eq(app_team.team_uuid, target_team_uuid));

    return result;
  } catch (error) {
    throw new TRPCError({
      message: "The database has encountered some issues.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}

export async function getTeamFromName(db: Database, team_name: string) {
  try {
    const result = await db.query.app_team.findFirst({
      columns: {
        team_name: true,
      },
      where: (team_data, { eq }) => eq(team_data.team_name, team_name),
    });

    return result;
  } catch (error) {
    throw new TRPCError({
      message: "The database has encountered some issues.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}

export async function getTeamFromTeamName(db: Database, team_name: string) {
  try {
    const team_from_code = await db.query.app_team.findFirst({
      columns: {
        team_uuid: true,
      },
      where: (team_data, { eq }) => eq(team_data.team_name, team_name),
    });

    return team_from_code;
  } catch (error) {
    throw new TRPCError({
      message: "The database has encountered some issues.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}

export async function joinTeam(
  db: Database,
  user_uuid: string,
  team_name: string,
  team_join_code: string,
) {
  try {
    const team_from_team_name = await getTeamFromTeamName(db, team_name);

    if (!team_from_team_name?.team_uuid) {
      throw new BaseError({
        error_title: "Invalid team name.",
        error_desc: "The provided team name is invalid.",
      });
    }

    const found_team_join_code = await db.query.app_team.findFirst({
      columns: { team_join_code: true },
      where: (team_data, { eq }) =>
        eq(team_data.team_uuid, team_from_team_name.team_uuid),
    });

    if (team_join_code === found_team_join_code?.team_join_code) {
      await db
        .update(app_user_profile)
        .set({
          user_team_uuid: team_from_team_name.team_uuid,
        })
        .where(eq(app_user_profile.user_uuid, user_uuid));
    } else {
      throw new BaseError({
        error_title: "Wrong team join code.",
        error_desc: "The provided team join code is incorrect.",
      });
    }
  } catch (error) {
    if (error instanceof BaseError) {
      throw new TRPCError({
        message: error.description!,
        code: "NOT_FOUND",
      });
    }
    throw new TRPCError({
      message: "The database has encountered some issues.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}

export async function leaveTeam(db: Database, user_uuid: string) {
  try {
    await db
      .update(app_user_profile)
      .set({
        user_team_uuid: null,
      })
      .where(eq(app_user_profile.user_uuid, user_uuid));
  } catch (error) {
    if (error instanceof BaseError) {
      throw new TRPCError({
        message: error.description!,
        code: "NOT_FOUND",
      });
    }
    throw new TRPCError({
      message: "The database has encountered some issues.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}

export async function getTeamInfo(db: Database, team_uuid: string) {
  try {
    const teamGeneralInfo = await db.query.app_team.findFirst({
      columns: {
        team_name: true,
        team_join_code: true,
        team_points: true,
        team_points_additive: true,
      },
      where: (team_data, { eq }) => eq(team_data.team_uuid, team_uuid),
    });

    const teamMembers = await db.query.app_user_profile.findMany({
      columns: {
        user_display_name: true,
      },
      where: (user_data, { eq }) => eq(user_data.user_team_uuid, team_uuid),
    });

    return { teamGeneralInfo, teamMembers };
  } catch (error) {
    throw new TRPCError({
      message: "The database has encountered some issues.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}
