import getCurrentStandingsProcedure from "../procedures/protected/leaderboard/getCurrentStandingsProcedure";
import { createTRPCRouter } from "../trpc";

export const leaderboardRouter = createTRPCRouter({
  get_current_standings: getCurrentStandingsProcedure,
});
