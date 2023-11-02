import updatePersonalDetailsProcedure from "../procedures/protected/onboarding/updatePersonalDetailsProcedure";
import { createTRPCRouter } from "../trpc";

export const onboardingRouter = createTRPCRouter({
  update_personal_details: updatePersonalDetailsProcedure,
});
