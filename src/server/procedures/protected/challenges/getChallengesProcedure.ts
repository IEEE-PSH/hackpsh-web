import { getChallenges } from "@/server/dao/challenges";
import { protectedProcedure } from "@/server/trpc";

export default protectedProcedure.query(async ({ ctx }) => {
  const challenges = await getChallenges(ctx.db);

  return challenges;
});
