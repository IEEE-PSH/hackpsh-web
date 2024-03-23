import createTeamProcedure from "../procedures/protected/team/createTeamProcedure";
import getTeamInfoProcedure from "../procedures/protected/team/getTeamInfoProcedure";
import joinTeamProcedure from "../procedures/protected/team/joinTeamProcedure";
import { createTRPCRouter } from "../trpc";

export const teamRouter = createTRPCRouter({
  join_team: joinTeamProcedure,
  create_team: createTeamProcedure,
  get_team_info: getTeamInfoProcedure,
});
