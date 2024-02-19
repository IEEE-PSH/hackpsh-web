import { publicProcedure } from "@/server/trpc";

export default publicProcedure.query(() => {
  //passed string should be in UTC; EST+=5 Hours
  const eventStartTime = new Date("2024-02-18T18:56:00");
  const timeRemaining = eventStartTime.valueOf() - Date.now();
  return { eventStartTime, timeRemaining };
});
