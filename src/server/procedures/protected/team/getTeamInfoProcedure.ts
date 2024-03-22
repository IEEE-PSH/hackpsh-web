import { getTeamInfo } from "@/server/dao/team";
import { protectedProcedure } from "@/server/trpc";
import { LookupUserSchema } from "@/server/zod-schemas/user";

export default protectedProcedure
  .input(LookupUserSchema)
  .query(async ({ ctx, input }) => {
    const result = await getTeamInfo(ctx.db, input.user_uuid);

    return {
      team_name: result.teamGeneralInfo?.team_name,
      team_join_code: result.teamGeneralInfo?.team_join_code,
      team_points: result.teamGeneralInfo?.team_points,
      team_members: result.teamMembers,
    };
  });
