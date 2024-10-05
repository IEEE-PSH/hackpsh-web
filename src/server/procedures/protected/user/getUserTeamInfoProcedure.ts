import { getUserTeamInfo } from "@/server/dao/user";
import { protectedProcedure } from "@/server/trpc";
import { LookupUserSchema } from "@/server/zod-schemas/user";
import { sql } from "drizzle-orm";

export default protectedProcedure
  .input(LookupUserSchema)
  .query(async ({ ctx, input }) => {
    const result = await getUserTeamInfo(ctx.db, input.user_uuid);

    const teamPoints = result.teamGeneralInfo?.team_points ?? 0;
    const pointsAdditive = result.teamGeneralInfo?.team_points_additive ?? 0;

    return {
      team_name: result.teamGeneralInfo?.team_name,
      team_join_code: result.teamGeneralInfo?.team_join_code,
      team_points: result.teamGeneralInfo?.team_points,
      team_total_points: teamPoints + pointsAdditive,
      team_members: result.teamMembers,
    };
  });
