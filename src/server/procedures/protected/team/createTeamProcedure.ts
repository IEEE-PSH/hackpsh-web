import { createTeam } from "@/server/dao/team";
import { protectedProcedure } from "@/server/trpc";
import { CreateTeamSchema } from "@/server/zod-schemas/team";

export default protectedProcedure
  .input(CreateTeamSchema)
  .mutation(async ({ ctx, input }) => {
    await createTeam(ctx.db, input.team_name);

    return {
      create_team: true,
    };
  });
