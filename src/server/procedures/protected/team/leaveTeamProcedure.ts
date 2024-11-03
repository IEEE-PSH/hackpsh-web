import { leaveTeam } from "@/server/dao/team";
import { protectedProcedure } from "@/server/trpc";
import { LookupUserSchema } from "@/server/zod-schemas/user";

export default protectedProcedure
  .input(LookupUserSchema)
  .mutation(async ({ ctx, input }) => {
    await leaveTeam(ctx.db, input.user_uuid);

    return {
      leave_team: true,
    };
  });
