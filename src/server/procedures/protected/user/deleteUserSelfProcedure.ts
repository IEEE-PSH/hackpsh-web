import { deleteUserSelf } from "@/server/dao/user";
import { protectedProcedure } from "@/server/trpc";
import { LookupUserSchema } from "@/server/zod-schemas/user";

export default protectedProcedure
  .input(LookupUserSchema)
  .mutation(async ({ ctx, input }) => {
    await deleteUserSelf(ctx.db, input.user_uuid);
  });
