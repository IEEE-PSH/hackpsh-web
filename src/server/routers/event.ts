import deleteAllAnnouncementsProcedure from "../procedures/protected/event/deleteAllAnnouncementsProcedure";
import deleteAllParticipantsProcedure from "../procedures/protected/event/deleteAllParticipantsProcedure";
import getEventDetailsProcedure from "../procedures/protected/event/getEventDetailsProcedure";
import updateEventDetailsProcedure from "../procedures/protected/event/updateEventDetailsProcedure";
import { createTRPCRouter } from "../trpc";

export const eventRouter = createTRPCRouter({
  update_event_details: updateEventDetailsProcedure,
  get_event_details: getEventDetailsProcedure,
  delete_all_announcements: deleteAllAnnouncementsProcedure,
  delete_all_participants: deleteAllParticipantsProcedure,
});
