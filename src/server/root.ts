import { authRouter } from "./routers/auth";
import { leaderboardRouter } from "./routers/leaderboard";
import { onboardingRouter } from "./routers/onboarding";
import { userRouter } from "./routers/user";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  user: userRouter,
  onboarding: onboardingRouter,
  leaderboard: leaderboardRouter,
});

export type AppRouter = typeof appRouter;
