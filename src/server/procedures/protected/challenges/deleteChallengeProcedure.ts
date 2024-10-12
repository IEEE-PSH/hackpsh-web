import { deleteChallenge } from "@/server/dao/challenges";
import { protectedProcedure } from "@/server/trpc";
import { isSolvedChallengeSchema } from "@/server/zod-schemas/challenges";

export default protectedProcedure
  .input(isSolvedChallengeSchema)
  .mutation(async ({ ctx, input }) => {
    const result = await deleteChallenge(
      ctx.db,
      input.user_uuid,
      input.challenge_id,
    );

    return result;
  });
