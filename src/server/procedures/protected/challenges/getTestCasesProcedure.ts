import { getTestCases } from "@/server/dao/challenges";
import { protectedProcedure } from "@/server/trpc";
import { LookupTestCasesSchema } from "@/server/zod-schemas/challenges";

export default protectedProcedure
  .input(LookupTestCasesSchema)
  .query(async ({ ctx, input }) => {
    const result = await getTestCases(ctx.db, input.challenge_uuid);

    return result;
  });
