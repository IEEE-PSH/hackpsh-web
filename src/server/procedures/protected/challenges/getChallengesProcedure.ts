import { getChallenges } from "@/server/dao/challenges";
import { protectedProcedure } from "@/server/trpc";
import { LookupUserSchema } from "@/server/zod-schemas/user";

export default protectedProcedure
  .input(LookupUserSchema)
  .query(async ({ ctx, input }) => {
    const challenges = await getChallenges(ctx.db, input.user_uuid);

    return challenges;
  });
