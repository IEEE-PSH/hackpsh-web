import { deleteTeam } from "@/server/dao/team";
import { protectedProcedure } from "@/server/trpc";
import { UpdateTeamSchema } from "@/server/zod-schemas/team";

export default protectedProcedure
  .input(UpdateTeamSchema)
  .mutation(async ({ ctx, input }) => {
    await deleteTeam(ctx.db, input.user_uuid, input.team_uuid);

    return {
      delete_team: true,
    };
  });
