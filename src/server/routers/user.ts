import getUserDropdownInfoProcedure from "../procedures/protected/user/getUserDropdownInfoProcedure";
import createUserProcedure from "../procedures/protected/user/createUserProcedure";
import doesUserExistProcedure from "../procedures/protected/user/doesUserExistProcedure";
import getUserOnboardingPhaseProcedure from "../procedures/protected/user/getUserOnboardingPhaseProcedure";
import getUserRoleProcedure from "../procedures/protected/user/getUserRoleProcedure";
import isOnboardingCompeleteProcedure from "../procedures/protected/user/isOnboardingCompeleteProcedure";
import updateOnboardingPhaseProcedure from "../procedures/protected/user/updateOnboardingPhaseProcedure";
import updatePersonalDetailsProcedure from "../procedures/protected/user/updatePersonalDetailsProcedure";
import updateSupportUsProcedure from "../procedures/protected/user/updateSupportUsProcedure";
import updateUserOnboardingStatusProcedure from "../procedures/protected/user/updateUserOnboardingStatusProcedure";
import validateUserOnboardingProcedure from "../procedures/protected/user/validateUserOnboardingProcedure";
import { createTRPCRouter } from "../trpc";

export const userRouter = createTRPCRouter({
  is_onboarding_complete: isOnboardingCompeleteProcedure,
  create_user: createUserProcedure,
  does_user_exist: doesUserExistProcedure,
  get_user_role: getUserRoleProcedure,
  get_user_onboarding_phase: getUserOnboardingPhaseProcedure,
  get_user_dropdown_info: getUserDropdownInfoProcedure,
  update_personal_details: updatePersonalDetailsProcedure,
  update_support_us: updateSupportUsProcedure,
  validate_user_onboarding: validateUserOnboardingProcedure,
  update_onboarding_phase: updateOnboardingPhaseProcedure,
  update_onboarding_status: updateUserOnboardingStatusProcedure,
});
