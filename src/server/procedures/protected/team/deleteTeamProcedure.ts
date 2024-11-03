import { deleteTeam } from "@/server/dao/team";
import { protectedProcedure } from "@/server/trpc";
import { LookupTeamSchema } from "@/server/zod-schemas/user";

export default protectedProcedure
  .input(LookupTeamSchema)
  .mutation(async ({ ctx, input }) => {
    await deleteTeam(ctx.db, input.team_uuid);

    return {
      delete_team: true,
    };
  });
