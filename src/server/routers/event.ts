import updateEventDetailsProcedure from "../procedures/protected/event/updateEventDetailsProcedure";
import { createTRPCRouter } from "../trpc";

export const eventRouter = createTRPCRouter({
  update_event_details: updateEventDetailsProcedure,
});
