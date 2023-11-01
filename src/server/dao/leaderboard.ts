import { Database } from "@/db/drizzle";
import { app_team } from "@/db/drizzle/schema";
import { TRPCError } from "@trpc/server";
import { desc } from "drizzle-orm";

export async function getCurrentStandings(db: Database) {
  try {
    const result = await db
      .select({
        team_id: app_team.team_uuid,
        team_name: app_team.team_name,
        team_points: app_team.team_points,
      })
      .from(app_team)
      .orderBy(desc(app_team.team_points));

    return result;
  } catch (error) {
    throw new TRPCError({
      message: "The database has encountered some issues.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}

export type TeamStandings = Awaited<ReturnType<typeof getCurrentStandings>>;
