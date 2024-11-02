import { createTeam } from "@/server/dao/team";
import { protectedProcedure } from "@/server/trpc";
import { CreateTeamSchema } from "@/server/zod-schemas/team";

export default protectedProcedure
  .input(CreateTeamSchema)
  .mutation(async ({ ctx, input }) => {
    await createTeam(
      ctx.db,
      input.user_uuid,
      input.team_name,
      input.team_join_code,
    );

    return {
      create_team: true,
    };
  });
