import { updateUserOnboardingPhase } from "@/server/dao/user";
import { protectedProcedure } from "@/server/trpc";
import { UpdateUserOnboardingPhaseSchema } from "@/server/zod-schemas/user";

export default protectedProcedure
  .input(UpdateUserOnboardingPhaseSchema)
  .mutation(async ({ ctx, input }) => {
    await updateUserOnboardingPhase(
      ctx.db,
      input.user_uuid,
      input.user_onboarding_phase,
    );

    return {
      update_user_onboarding_phase: true,
    };
  });
