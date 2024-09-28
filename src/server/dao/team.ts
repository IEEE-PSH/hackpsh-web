import { type Database } from "@/db/drizzle";
import { app_team, app_user_profile } from "@/db/drizzle/schema";
import { BaseError } from "@/shared/error";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { getUserRole } from "./user";

function generateRandomCode() {
  const code = [];

  // Generate three random uppercase letters
  for (let i = 0; i < 3; i++) {
    const randomLetterCode = Math.floor(65 + Math.random() * 26); // ASCII values for A-Z
    code.push(String.fromCharCode(randomLetterCode));
  }

  // Generate four random digits in the range [1000, 9999]
  const randomNumber = Math.floor(1000 + Math.random() * 9000);
  code.push(randomNumber.toString());

  return code.join("");
}

async function availableRandomCode(db: Database) {
  let code;
  let team_from_code;

  do {
    code = generateRandomCode();
    team_from_code = await getTeamFromCode(db, code);
  } while (team_from_code?.team_uuid);

  return code;
}

export async function createTeam(
  db: Database,
  user_uuid: string,
  team_name: string,
) {
  try {
    const team_from_name = await getTeamFromName(db, team_name);

    if (team_from_name?.team_name) {
      throw new BaseError({
        error_title: "Team Already Exists.",
        error_desc:
          "Please pick a different team, as this team name is already taken.",
      });
    }

    const team_join_code = await availableRandomCode(db);

    await db.insert(app_team).values({
      team_name,
      team_join_code,
    });

    await joinTeam(db, user_uuid, team_join_code);
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

export async function getTeamFromCode(db: Database, team_join_code: string) {
  try {
    const team_from_code = await db.query.app_team.findFirst({
      columns: {
        team_uuid: true,
      },
      where: (team_data, { eq }) =>
        eq(team_data.team_join_code, team_join_code),
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
  team_join_code: string,
) {
  try {
    const team_from_code = await getTeamFromCode(db, team_join_code);

    if (!team_from_code?.team_uuid) {
      throw new BaseError({
        error_title: "Invalid Team Code",
        error_desc: "The provided team code is invalid.",
      });
    }

    await db
      .update(app_user_profile)
      .set({
        user_team_uuid: team_from_code.team_uuid,
        user_onboarding_phase: "support-us",
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
