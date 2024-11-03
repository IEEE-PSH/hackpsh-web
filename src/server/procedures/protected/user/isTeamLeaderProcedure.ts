import { isTeamLeader } from "@/server/dao/user";
import { protectedProcedure } from "@/server/trpc";
import { LookupUserSchema } from "@/server/zod-schemas/user";

export default protectedProcedure
  .input(LookupUserSchema)
  .query(async ({ ctx, input }) => {
    const result = await isTeamLeader(ctx.db, input.user_uuid);

    return {
      is_team_leader: result?.user_team_leader,
    };
  });
