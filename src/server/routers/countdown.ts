import getTimeRemainingProcedure from "../procedures/public/event/getTimeRemainingProcedure";
import { createTRPCRouter } from "../trpc";

export const countdownRouter = createTRPCRouter({
  get_time_remaining: getTimeRemainingProcedure,
});
