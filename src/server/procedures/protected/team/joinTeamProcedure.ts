import { joinTeam } from "@/server/dao/team";
import { protectedProcedure } from "@/server/trpc";
import { JoinTeamSchema } from "@/server/zod-schemas/team";

export default protectedProcedure
  .input(JoinTeamSchema)
  .mutation(async ({ ctx, input }) => {
    await joinTeam(
      ctx.db,
      input.user_uuid,
      input.team_name,
      input.team_join_code,
    );

    return {
      join_team: true,
    };
  });
