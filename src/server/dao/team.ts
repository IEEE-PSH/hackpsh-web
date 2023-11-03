import { type Database } from "@/db/drizzle";
import { app_team } from "@/db/drizzle/schema";
import { TRPCError } from "@trpc/server";

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
