import { deleteUser } from "@/server/dao/user";
import { protectedProcedure } from "@/server/trpc";
import { DeleteUserSchema } from "@/server/zod-schemas/user";

export default protectedProcedure
  .input(DeleteUserSchema)
  .mutation(async ({ ctx, input }) => {
    await deleteUser(ctx.db, input.user_uuid, input.target_uuid);
  });
