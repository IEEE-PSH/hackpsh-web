import getTimeRemainingProcedure from "../procedures/public/countdown/getTimeRemaining";
import { createTRPCRouter } from "../trpc";

export const countdownRouter = createTRPCRouter({
  get_time_remaining: getTimeRemainingProcedure,
});
