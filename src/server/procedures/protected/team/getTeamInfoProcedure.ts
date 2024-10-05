import { getTeamInfo } from "@/server/dao/team";
import { protectedProcedure } from "@/server/trpc";
import { LookupTeamSchema } from "@/server/zod-schemas/user";

export default protectedProcedure
  .input(LookupTeamSchema)
  .query(async ({ ctx, input }) => {
    const result = await getTeamInfo(ctx.db, input.team_uuid);

    return {
      team_name: result.teamGeneralInfo?.team_name,
      team_join_code: result.teamGeneralInfo?.team_join_code,
      team_points: result.teamGeneralInfo?.team_points,
      team_points_additive: result.teamGeneralInfo?.team_points_additive,
      team_total_points:
        result.teamGeneralInfo?.team_points! +
        result.teamGeneralInfo?.team_points_additive!,
      team_members: result.teamMembers,
    };
  });
