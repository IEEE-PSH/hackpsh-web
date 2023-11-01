import { getCurrentStandings } from "@/server/dao/leaderboard";
import { protectedProcedure } from "@/server/trpc";

export default protectedProcedure.query(async ({ ctx }) => {
  const result = await getCurrentStandings(ctx.db);

  return result;
});
