import { kickUserFromTeam, updateTeamLeader } from "@/server/dao/user";
import { protectedProcedure } from "@/server/trpc";
import { UpdateTeamLeaderSchema } from "@/server/zod-schemas/team";
import { LookupUserSchema } from "@/server/zod-schemas/user";

export default protectedProcedure
  .input(LookupUserSchema)
  .mutation(async ({ ctx, input }) => {
    await kickUserFromTeam(ctx.db, input.user_uuid);

    return {
      kick_user_from_team: true,
    };
  });
