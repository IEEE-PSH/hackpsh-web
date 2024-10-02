import { getChallenge } from "@/server/dao/challenges";
import { protectedProcedure } from "@/server/trpc";
import { LookupChallengeSchema } from "@/server/zod-schemas/challenges";

export default protectedProcedure
  .input(LookupChallengeSchema)
  .query(async ({ ctx, input }) => {
    const result = await getChallenge(ctx.db, input.challenge_id);

    return result;
  });
