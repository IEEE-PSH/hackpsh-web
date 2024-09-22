import { getEventDetails } from "@/server/dao/event";
import { publicProcedure } from "@/server/trpc";

// export default publicProcedure.query(async () => {
//   // passed string should be in UTC; EST+=5 Hours
//   // account for daylight savings if needed
//   // proper ISO 8601 format
//   const {} = await getEventDetails(ctx)
//   const eventStartTime = new Date("2024-03-23T14:00:00.000Z");
//   const timeRemaining = eventStartTime.valueOf() - Date.now();
//   const eventFinishTime = new Date("2024-03-23T00:00:00.000Z");

//   return { eventStartTime, timeRemaining, eventFinishTime };
// });

export default publicProcedure.query(async ({ ctx }) => {
  const result = await getEventDetails(ctx.db);

  // const eventStartTime = new Date(result!.event_start_time);
  // const timeRemaining = eventStartTime.valueOf() - Date.now();
  // const eventFinishTime = new Date(result!.event_end_time);

  const eventStartTime = new Date();
  const timeRemaining = eventStartTime.valueOf() - Date.now();
  const eventFinishTime = new Date();

  return { eventStartTime, timeRemaining, eventFinishTime };
});
