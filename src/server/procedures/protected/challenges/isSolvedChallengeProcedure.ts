import { isSolvedChallenge } from "@/server/dao/challenges";
import { protectedProcedure } from "@/server/trpc";
import { isSolvedChallengeSchema } from "@/server/zod-schemas/challenges";

export default protectedProcedure
  .input(isSolvedChallengeSchema)
  .query(async ({ ctx, input }) => {
    const result = await isSolvedChallenge(
      ctx.db,
      input.challenge_id,
      input.user_uuid,
    );

    return result;
  });
