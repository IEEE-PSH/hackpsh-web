import { getEventDetails } from "@/server/dao/event";
import { protectedProcedure } from "@/server/trpc";

export default protectedProcedure.query(async ({ ctx }) => {
  const result = await getEventDetails(ctx.db);

  return {
    event_date: result!.event_date,
    event_start_time: result!.event_start_time,
    event_end_time: result!.event_end_time,
    event_start_hour: result!.event_start_hour,
    event_duration: result!.event_duration,
  };
});
