import { getEditChallengeInfo } from "@/server/dao/challenges";
import { protectedProcedure } from "@/server/trpc";
import { LookupChallengeSchema } from "@/server/zod-schemas/challenges";

export default protectedProcedure
  .input(LookupChallengeSchema)
  .query(async ({ ctx, input }) => {
    const result = await getEditChallengeInfo(ctx.db, input.challenge_id);

    return result;
  });
