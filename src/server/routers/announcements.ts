import createAnnouncementPostProcedure from "../procedures/protected/announcements/createAnnouncementPostProcedure";
import getAnnouncementPostProcedure from "../procedures/protected/announcements/getAnnouncementPostProcedure";
import getAnnouncementsProcedure from "../procedures/protected/announcements/getAnnouncementsProcedure";
import { createTRPCRouter } from "../trpc";

export const announcementsRouter = createTRPCRouter({
  get_announcement_posts: getAnnouncementsProcedure,
  create_announcement_post: createAnnouncementPostProcedure,
  get_announcement_post: getAnnouncementPostProcedure,
});
