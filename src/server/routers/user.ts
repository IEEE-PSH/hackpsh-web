import createUserProcedure from "../procedures/protected/user/createUserProcedure";
import doesUserExistProcedure from "../procedures/protected/user/doesUserExistProcedure";
import isOnboardingCompeleteProcedure from "../procedures/protected/user/isOnboardingCompeleteProcedure";
import { createTRPCRouter } from "../trpc";

export const userRouter = createTRPCRouter({
  is_onboarding_complete: isOnboardingCompeleteProcedure,
  create_user: createUserProcedure,
  does_user_exist: doesUserExistProcedure,
});
