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
import getUserSettingsInfoProcedure from "../procedures/protected/user/getUserSettingsInfoProcedure";
import getUserSupportInfoProcedure from "../procedures/protected/user/getUserSupportInfoProcedure";
import { createTRPCRouter } from "../trpc";
import updateUserSettingsProcedure from "../procedures/protected/user/updateUserSettingsProcedure";
import getUsersProcedure from "../procedures/protected/user/getUsersProcedure";
import updateUserRoleProcedure from "../procedures/protected/user/updateUserRoleProcedure";
import deleteUserProcedure from "../procedures/protected/user/deleteUserProcedure";
import getUserInfoProcedure from "../procedures/protected/user/getUserInfoProcedure";
import getUserTeamInfoProcedure from "../procedures/protected/user/getUserTeamInfoProcedure";
import updateSchoolDetailsProcedure from "../procedures/protected/user/updateSchoolDetailsProcedure";
import isUserOnTeamProcedure from "../procedures/protected/user/isUserOnTeamProcedure";
import isTeamLeaderProcedure from "../procedures/protected/user/isTeamLeaderProcedure";
import deleteTeamSelfProcedure from "../procedures/protected/user/deleteTeamSelfProcedure";
import getMiddlewareInfoProcedure from "../procedures/protected/user/getMiddlewareInfoProcedure";

export const userRouter = createTRPCRouter({
  get_middleware_info: getMiddlewareInfoProcedure,
  is_onboarding_complete: isOnboardingCompeleteProcedure,
  create_user: createUserProcedure,
  does_user_exist: doesUserExistProcedure,
  get_user_role: getUserRoleProcedure,
  get_user_onboarding_phase: getUserOnboardingPhaseProcedure,
  get_user_dropdown_info: getUserDropdownInfoProcedure,
  get_user_info: getUserInfoProcedure,
  get_user_settings_info: getUserSettingsInfoProcedure,
  update_personal_details: updatePersonalDetailsProcedure,
  update_school_details: updateSchoolDetailsProcedure,
  update_support_us: updateSupportUsProcedure,
  update_user_settings: updateUserSettingsProcedure,
  get_user_support_info: getUserSupportInfoProcedure,
  validate_user_onboarding: validateUserOnboardingProcedure,
  update_onboarding_phase: updateOnboardingPhaseProcedure,
  update_onboarding_status: updateUserOnboardingStatusProcedure,
  get_users: getUsersProcedure,
  update_user_role: updateUserRoleProcedure,
  delete_user: deleteUserProcedure,
  get_user_team_info: getUserTeamInfoProcedure,
  is_on_team: isUserOnTeamProcedure,
  is_team_leader: isTeamLeaderProcedure,
  delete_team_self: deleteTeamSelfProcedure,
});
