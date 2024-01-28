import getCurrentTimeProcedure from "../procedures/public/countdown/getCurrentTimeProcedure";
import { createTRPCRouter } from "../trpc";

export const countdownRouter = createTRPCRouter({
  get_current_time: getCurrentTimeProcedure,
});
