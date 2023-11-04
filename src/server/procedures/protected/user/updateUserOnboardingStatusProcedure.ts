import { updateUserOnboardingStatus } from "@/server/dao/user";
import { protectedProcedure } from "@/server/trpc";
import { UpdateUserOnboardingStatusSchema } from "@/server/zod-schemas/user";

export default protectedProcedure
  .input(UpdateUserOnboardingStatusSchema)
  .mutation(async ({ ctx, input }) => {
    await updateUserOnboardingStatus(
      ctx.db,
      input.user_uuid,
      input.user_onboarding_complete,
    );

    return {
      update_user_onboarding_status: true,
    };
  });
