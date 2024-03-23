import { publicProcedure } from "@/server/trpc";

export default publicProcedure.query(() => {
  // passed string should be in UTC; EST+=5 Hours
  // account for daylight savings if needed
  // proper ISO 8601 format
  const eventStartTime = new Date("2024-03-23T14:00:00.000Z");
  const timeRemaining = eventStartTime.valueOf() - Date.now();
  const eventFinishTime = new Date("2024-03-23T00:00:00.000Z");

  return { eventStartTime, timeRemaining, eventFinishTime };
});
