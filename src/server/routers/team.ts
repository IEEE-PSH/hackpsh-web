import createTeamProcedure from "../procedures/protected/team/createTeamProcedure";
import updateTeamProcedure from "../procedures/protected/team/updateTeamProcedure";
import getTeamInfoProcedure from "../procedures/protected/team/getTeamInfoProcedure";
import joinTeamProcedure from "../procedures/protected/team/joinTeamProcedure";
import { createTRPCRouter } from "../trpc";
import deleteTeamProcedure from "../procedures/protected/team/deleteTeamProcedure";

export const teamRouter = createTRPCRouter({
  join_team: joinTeamProcedure,
  create_team: createTeamProcedure,
  update_team: updateTeamProcedure,
  get_team_info: getTeamInfoProcedure,
  delete_team: deleteTeamProcedure,
});
