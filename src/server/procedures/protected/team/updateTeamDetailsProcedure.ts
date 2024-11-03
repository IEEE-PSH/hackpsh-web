import { updateTeamDetails } from "@/server/dao/team";
import { protectedProcedure } from "@/server/trpc";
import { CreateTeamSchema, UpdateTeamSchema } from "@/server/zod-schemas/team";

export default protectedProcedure
  .input(CreateTeamSchema)
  .mutation(async ({ ctx, input }) => {
    await updateTeamDetails(
      ctx.db,
      input.user_uuid,
      input.team_name,
      input.team_join_code,
    );

    return {
      update_team_details: true,
    };
  });
