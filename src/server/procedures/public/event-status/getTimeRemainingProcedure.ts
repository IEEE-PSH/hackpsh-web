import { publicProcedure } from "@/server/trpc";

export default publicProcedure.query(() => {
  //passed string should be in UTC; EST+=5 Hours
  const eventStartTime = new Date("2024-03-23T15:00:00");
  const timeRemaining = eventStartTime.valueOf() - Date.now();
  return { eventStartTime, timeRemaining };
});
