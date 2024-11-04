import deleteAllAnnouncementsProcedure from "../procedures/protected/event/deleteAllAnnouncementsProcedure";
import deleteAllChallengesProcedure from "../procedures/protected/event/deleteAllChallengesProcedure";
import deleteAllParticipantsProcedure from "../procedures/protected/event/deleteAllParticipantsProcedure";
import deleteAllTeamsProcedure from "../procedures/protected/event/deleteAllTeamsProcedure";
import getEventDetailsProcedure from "../procedures/protected/event/getEventDetailsProcedure";
import isChallengesEnabledProcedure from "../procedures/protected/event/isChallengesEnabledProcedure";
import isTeamCreationEnabledProcedure from "../procedures/protected/event/isTeamCreationEnabledProcedure";
import updateEventDetailsProcedure from "../procedures/protected/event/updateEventDetailsProcedure";
import { createTRPCRouter } from "../trpc";

export const eventRouter = createTRPCRouter({
  update_event_details: updateEventDetailsProcedure,
  get_event_details: getEventDetailsProcedure,
  delete_all_announcements: deleteAllAnnouncementsProcedure,
  delete_all_participants: deleteAllParticipantsProcedure,
  delete_all_challenges: deleteAllChallengesProcedure,
  delete_all_teams: deleteAllTeamsProcedure,
  is_challenges_enabled: isChallengesEnabledProcedure,
  is_team_creation_enabled: isTeamCreationEnabledProcedure,
});
