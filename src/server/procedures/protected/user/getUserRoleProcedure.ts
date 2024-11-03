import { getUserRole } from "@/server/dao/user";
import { protectedProcedure } from "@/server/trpc";
import { LookupUserSchema } from "@/server/zod-schemas/user";

export default protectedProcedure
  .input(LookupUserSchema)
  .query(async ({ ctx, input }) => {
    const result = await getUserRole(ctx.db, input.user_uuid);

    return {
      get_user_role: result?.user_role,
    };
  });
