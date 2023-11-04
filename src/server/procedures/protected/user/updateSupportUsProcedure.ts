import { updateUserSupport } from "@/server/dao/user";
import { protectedProcedure } from "@/server/trpc";
import { UpdateUserSupportSchema } from "@/server/zod-schemas/user";

export default protectedProcedure
  .input(UpdateUserSupportSchema)
  .mutation(async ({ ctx, input }) => {
    await updateUserSupport(
      ctx.db,
      input.user_uuid,
      input.user_support_administrative,
      input.user_support_technical,
    );

    return {
      update_user_support: true,
    };
  });
