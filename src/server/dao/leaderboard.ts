import { type Database } from "@/db/drizzle";
import { app_team } from "@/db/drizzle/schema";
import { TRPCError } from "@trpc/server";
import { desc } from "drizzle-orm";

export async function getCurrentStandings(db: Database) {
  try {
    const result = await db
      .select({
        team_uuid: app_team.team_uuid,
        team_name: app_team.team_name,
        team_points: app_team.team_points,
        team_points_additive: app_team.team_points_additive,
      })
      .from(app_team)
      .orderBy(desc(app_team.team_points));

    const newResult = result.map((team) => ({
      team_uuid: team.team_uuid,
      team_name: team.team_name,
      team_total_points: team.team_points + team.team_points_additive,
    }));

    newResult.sort((a, b) => b.team_total_points - a.team_total_points);

    return newResult;
  } catch (error) {
    throw new TRPCError({
      message: "The database has encountered some issues.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}

export type LeaderboardStandings = Awaited<
  ReturnType<typeof getCurrentStandings>
>;
export type TeamStanding = LeaderboardStandings[number];
