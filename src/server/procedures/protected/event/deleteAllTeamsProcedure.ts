import { deleteAllChallenges, deleteAllTeams } from "@/server/dao/event";
import { protectedProcedure } from "@/server/trpc";
import { LookupUserSchema } from "@/server/zod-schemas/user";

export default protectedProcedure
  .input(LookupUserSchema)
  .mutation(async ({ ctx, input }) => {
    await deleteAllTeams(ctx.db, input.user_uuid);

    return {
      delete_all_challenges: true,
    };
  });
