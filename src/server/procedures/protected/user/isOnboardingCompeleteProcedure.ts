import { LookupUserSchema } from "@/server/zod-schemas/user";
import { getUserOnboardingStatus } from "@/server/dao/user";
import { protectedProcedure } from "@/server/trpc";

export default protectedProcedure
  .input(LookupUserSchema)
  .query(async ({ ctx, input }) => {
    let onboardingStatus = false;
    const result = await getUserOnboardingStatus(ctx.db, input.user_uuid);

    if (result) {
      onboardingStatus = result.user_onboarding_complete ?? false;
    }

    return {
      is_onboarding_complete: onboardingStatus,
    };
  });
