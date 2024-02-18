import getTimeRemainingProcedure from "../procedures/public/announcements/getTimeRemainingProcedure";
import { createTRPCRouter } from "../trpc";

export const countdownRouter = createTRPCRouter({
  get_time_remaining: getTimeRemainingProcedure,
});
