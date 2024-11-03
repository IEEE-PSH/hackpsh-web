import { updateTeamLeader } from "@/server/dao/user";
import { protectedProcedure } from "@/server/trpc";
import { UpdateTeamLeaderSchema } from "@/server/zod-schemas/team";

export default protectedProcedure
  .input(UpdateTeamLeaderSchema)
  .mutation(async ({ ctx, input }) => {
    await updateTeamLeader(
      ctx.db,
      input.user_uuid,
      input.is_team_leader,
      input.target_uuid,
    );

    return {
      update_team_leader: true,
    };
  });
