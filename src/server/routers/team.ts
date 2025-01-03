import createTeamProcedure from "../procedures/protected/team/createTeamProcedure";
import updateTeamProcedure from "../procedures/protected/team/updateTeamProcedure";
import getTeamInfoProcedure from "../procedures/protected/team/getTeamInfoProcedure";
import joinTeamProcedure from "../procedures/protected/team/joinTeamProcedure";
import { createTRPCRouter } from "../trpc";
import deleteTeamProcedure from "../procedures/protected/team/deleteTeamProcedure";
import leaveTeamProcedure from "../procedures/protected/team/leaveTeamProcedure";
import updateTeamDetailsProcedure from "../procedures/protected/team/updateTeamDetailsProcedure";
import getTeamsProcedure from "../procedures/protected/team/getTeamsProcedure";
import updateTeamLeaderProcedure from "../procedures/protected/team/updateTeamLeaderProcedure";
import kickUserFromTeamProcedure from "../procedures/protected/team/kickUserFromTeamProcedure";
import doesTeamExistProcedure from "../procedures/protected/team/doesTeamExistProcedure";

export const teamRouter = createTRPCRouter({
  join_team: joinTeamProcedure,
  create_team: createTeamProcedure,
  update_team: updateTeamProcedure,
  get_team_info: getTeamInfoProcedure,
  delete_team: deleteTeamProcedure,
  leave_team: leaveTeamProcedure,
  update_team_details: updateTeamDetailsProcedure,
  get_teams: getTeamsProcedure,
  update_team_leader: updateTeamLeaderProcedure,
  kick_user: kickUserFromTeamProcedure,
  does_team_exist: doesTeamExistProcedure,
});
