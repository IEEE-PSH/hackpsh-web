import createUserProcedure from "../procedures/protected/user/createUserProcedure";
import doesUserExistProcedure from "../procedures/protected/user/doesUserExistProcedure";
import getUserOnboardingPhaseProcedure from "../procedures/protected/user/getUserOnboardingPhaseProcedure";
import getUserRoleProcedure from "../procedures/protected/user/getUserRoleProcedure";
import isOnboardingCompeleteProcedure from "../procedures/protected/user/isOnboardingCompeleteProcedure";
import { createTRPCRouter } from "../trpc";

export const userRouter = createTRPCRouter({
  is_onboarding_complete: isOnboardingCompeleteProcedure,
  create_user: createUserProcedure,
  does_user_exist: doesUserExistProcedure,
  get_user_role: getUserRoleProcedure,
  get_user_onboarding_phase: getUserOnboardingPhaseProcedure,
});
