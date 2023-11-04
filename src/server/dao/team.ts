import { type Database } from "@/db/drizzle";
import { app_team, app_user_profile } from "@/db/drizzle/schema";
import { BaseError } from "@/shared/error";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";

export async function createTeam(db: Database, team_name: string) {
  try {
    const result = await db.insert(app_team).values({
      team_name,
      team_join_code: "",
    });

    return result;
  } catch (error) {
    throw new TRPCError({
      message: "The database has encountered some issues.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}

export async function doesTeamExist(db: Database, team_name: string) {
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
