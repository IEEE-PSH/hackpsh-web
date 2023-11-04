import createTeamProcedure from "../procedures/protected/team/createTeamProcedure";
import joinTeamProcedure from "../procedures/protected/team/joinTeamProcedure";
import { createTRPCRouter } from "../trpc";

export const teamRouter = createTRPCRouter({
  join_team: joinTeamProcedure,
  create_team: createTeamProcedure,
});
