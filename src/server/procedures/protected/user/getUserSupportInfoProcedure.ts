import { getUserSupportInfo } from "@/server/dao/user";
import { protectedProcedure } from "@/server/trpc";
import { LookupUserSchema } from "@/server/zod-schemas/user";

export default protectedProcedure
  .input(LookupUserSchema)
  .query(async ({ ctx, input }) => {
    const result = await getUserSupportInfo(ctx.db, input.user_uuid);

    return {
      user_support_administrative: result
        ? result.user_support_administrative
        : false,
      user_support_technical: result ? result.user_support_technical : false,
    };
  });
