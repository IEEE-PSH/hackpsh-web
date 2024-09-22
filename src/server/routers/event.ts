import getEventDetailsProcedure from "../procedures/protected/event/getEventDetailsProcedure";
import updateEventDetailsProcedure from "../procedures/protected/event/updateEventDetailsProcedure";
import { createTRPCRouter } from "../trpc";

export const eventRouter = createTRPCRouter({
  update_event_details: updateEventDetailsProcedure,
  get_event_details: getEventDetailsProcedure,
});
