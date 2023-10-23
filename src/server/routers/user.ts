import { OnboardingCompleteLookupSchema } from "@/app/_lib/zod-schemas/onboarding";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  is_onboarding_complete: protectedProcedure
    .input(OnboardingCompleteLookupSchema)
    .query(async ({ ctx, input }) => {
      let onboardingStatus = false;

      const user_data = await ctx.db.query.app_user_profile.findFirst({
        columns: {
          user_onboarding_complete: true,
        },
        where: (user_data, { eq }) => eq(user_data.user_uuid, input.user_uuid),
      });

      if (user_data) {
        onboardingStatus = user_data.user_onboarding_complete ?? false;
      }
      return {
        is_onboarding_complete: onboardingStatus,
      };
    }),
});
