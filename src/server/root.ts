import { announcementsRouter } from "./routers/announcements";
import { authRouter } from "./routers/auth";
import { leaderboardRouter } from "./routers/leaderboard";
import { teamRouter } from "./routers/team";
import { userRouter } from "./routers/user";
import { feedbackRouter } from "./routers/feedback";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  user: userRouter,
  leaderboard: leaderboardRouter,
  announcements: announcementsRouter,
  team: teamRouter,
  feedback: feedbackRouter,
});

export type AppRouter = typeof appRouter;
