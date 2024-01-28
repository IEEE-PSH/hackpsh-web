import { announcementsRouter } from "./routers/announcements";
import { authRouter } from "./routers/auth";
import { countdownRouter } from "./routers/countdown";
import { leaderboardRouter } from "./routers/leaderboard";
import { teamRouter } from "./routers/team";
import { userRouter } from "./routers/user";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  user: userRouter,
  leaderboard: leaderboardRouter,
  announcements: announcementsRouter,
  team: teamRouter,
  countdown: countdownRouter,
});

export type AppRouter = typeof appRouter;
