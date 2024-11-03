import { updateUserPersonalDetails } from "@/server/dao/user";
import { protectedProcedure } from "@/server/trpc";
import { UpdateUserPersonalDetailsSchema } from "@/server/zod-schemas/user";

export default protectedProcedure
  .input(UpdateUserPersonalDetailsSchema)
  .mutation(async ({ ctx, input }) => {
    await updateUserPersonalDetails(
      ctx.db,
      input.user_uuid,
      input.user_first_name,
      input.user_last_name,
      input.user_display_name,
    );

    return {
      update_user_personal_details: true,
    };
  });
