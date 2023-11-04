import { getUserOnboardingFields } from "@/server/dao/user";
import { protectedProcedure } from "@/server/trpc";
import {
  LookupUserSchema,
  ValidUserProfileAfterOnboardingSchema,
} from "@/server/zod-schemas/user";

export default protectedProcedure
  .input(LookupUserSchema)
  .query(async ({ ctx, input }) => {
    const user_profile = await getUserOnboardingFields(ctx.db, input.user_uuid);

    const { success } =
      ValidUserProfileAfterOnboardingSchema.safeParse(user_profile);
    return {
      is_valid_user_profile_after_onboarding: success,
    };
  });
