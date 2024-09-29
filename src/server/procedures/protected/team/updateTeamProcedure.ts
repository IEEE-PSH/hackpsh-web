import { updateTeam } from "@/server/dao/team";
import { protectedProcedure } from "@/server/trpc";
import { UpdateTeamSchema } from "@/server/zod-schemas/team";

export default protectedProcedure
  .input(UpdateTeamSchema)
  .mutation(async ({ ctx, input }) => {
    await updateTeam(
      ctx.db,
      input.user_uuid,
      input.team_uuid,
      input.team_points_additive,
    );

    return {
      create_team: true,
    };
  });
