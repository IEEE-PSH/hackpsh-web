import { announcementsRouter } from "./routers/announcements";
import { countdownRouter } from "./routers/countdown";
import { authRouter } from "./routers/auth";
import { contactRouter } from "./routers/contact";
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
  contact: contactRouter,
  countdown: countdownRouter,
});

export type AppRouter = typeof appRouter;
