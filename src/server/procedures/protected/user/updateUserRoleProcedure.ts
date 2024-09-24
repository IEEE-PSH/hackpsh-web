import { updateUserRole } from "@/server/dao/user";
import { protectedProcedure } from "@/server/trpc";
import { UpdateUserRoleSchema } from "@/server/zod-schemas/user";

export default protectedProcedure
  .input(UpdateUserRoleSchema)
  .mutation(async ({ ctx, input }) => {
    await updateUserRole(
      ctx.db,
      input.user_uuid,
      input.target_uuid,
      input.target_role,
    );
  });
