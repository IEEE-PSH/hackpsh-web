import createAnnouncementPostProcedure from "../procedures/protected/announcements/createAnnouncementPostProcedure";
import getAnnouncementsProcedure from "../procedures/protected/announcements/getAnnouncementsProcedure";
import { createTRPCRouter } from "../trpc";

export const announcementsRouter = createTRPCRouter({
  get_announcement_posts: getAnnouncementsProcedure,
  create_announcement_post: createAnnouncementPostProcedure,
});
