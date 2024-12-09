import { getArchivedChallenges } from "@/server/dao/challenges";
import { protectedProcedure } from "@/server/trpc";

export default protectedProcedure
  .query(async ({ ctx }) => {
    const challenges = await getArchivedChallenges(ctx.db);

    return challenges;
  });
