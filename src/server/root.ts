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

// Congratulations! You've now created an API Endpoint
// to accept requests from the clients, sanitize their input,
// and then create records within the database.
//
// Now we need to create a front-end page so the users 
// can provide input and call our API Endpoint to submit
// their data into our database!
//
// Goal: Build out the Feedback Page to accept input and
// submit data to our API Endpoint to create feedback report records.
//
// Get started at `src/app/(main)/(routes)/feedback/page.tsx`
