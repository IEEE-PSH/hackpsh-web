import { updateEventDetails } from "@/server/dao/event";
import { protectedProcedure } from "@/server/trpc";
import { UpdateEventDetailsSchema } from "@/server/zod-schemas/event";

export default protectedProcedure
  .input(UpdateEventDetailsSchema)
  .mutation(async ({ ctx, input }) => {
    await updateEventDetails(
      ctx.db,
      input.user_uuid,
      input.event_date,
      input.event_start_hour,
      input.event_end_hour,
    );

    return {
      update_event_details: true,
    };
  });
