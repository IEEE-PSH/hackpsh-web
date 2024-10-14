import { isChallengesEnabled } from "@/server/dao/event";
import { protectedProcedure } from "@/server/trpc";

export default protectedProcedure.query(async ({ ctx }) => {
  const result = await isChallengesEnabled(ctx.db);

  return result;
});
