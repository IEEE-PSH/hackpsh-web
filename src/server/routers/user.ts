import { OnboardingCompleteLookupSchema } from "@/app/_lib/zod-schemas/onboarding";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { type Database } from "@/db/drizzle";

async function fetchOnboardingStatus(db: Database, user_uuid: string) {
  let onboardingStatus = false;

  const user_data = await db.query.app_user_profile.findFirst({
    columns: {
      user_onboarding_complete: true,
    },
    where: (user_data, { eq }) => eq(user_data.user_uuid, user_uuid),
  });

  if (user_data) {
    onboardingStatus = user_data.user_onboarding_complete ?? false;
  }

  return onboardingStatus;
}

export const userRouter = createTRPCRouter({
  is_onboarding_complete: publicProcedure
    .input(OnboardingCompleteLookupSchema)
    .query(async ({ ctx, input }) => {
      const onboardingStatus = await fetchOnboardingStatus(
        ctx.db,
        input.user_uuid,
      );

      return {
        is_onboarding_complete: onboardingStatus,
      };
    }),
});
