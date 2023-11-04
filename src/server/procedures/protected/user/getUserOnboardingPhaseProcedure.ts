import { getUserOnboardingPhase } from "@/server/dao/user";
import { protectedProcedure } from "@/server/trpc";
import { LookupUserSchema } from "@/server/zod-schemas/user";

export default protectedProcedure
  .input(LookupUserSchema)
  .query(async ({ ctx, input }) => {
    const result = await getUserOnboardingPhase(ctx.db, input.user_uuid);

    return {
      get_user_onboarding_phase: result!.user_onboarding_phase,
    };
  });
