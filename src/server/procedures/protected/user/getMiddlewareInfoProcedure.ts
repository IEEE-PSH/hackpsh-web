import { LookupUserSchema } from "@/server/zod-schemas/user";
import { getMiddlewareInfo } from "@/server/dao/user";
import { protectedProcedure } from "@/server/trpc";

export default protectedProcedure
  .input(LookupUserSchema)
  .query(async ({ ctx, input }) => {
    const result = await getMiddlewareInfo(ctx.db, input.user_uuid);

    return result ?? null
  });
