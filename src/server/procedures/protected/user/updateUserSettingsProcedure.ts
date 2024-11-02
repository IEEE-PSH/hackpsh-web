import { updateUserSettings } from "@/server/dao/user";
import { protectedProcedure } from "@/server/trpc";
import { UpdateUserSettingsSchema } from "@/server/zod-schemas/user";

export default protectedProcedure
  .input(UpdateUserSettingsSchema)
  .mutation(async ({ ctx, input }) => {
    await updateUserSettings(
      ctx.db,
      input.user_uuid,
      input.user_first_name,
      input.user_last_name,
      input.user_display_name,
      input.user_school_year,
      input.user_major,
      input.user_support_administrative,
      input.user_support_technical,
    );

    return {
      update_user_personal_details: true,
    };
  });
