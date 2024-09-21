import createAnnouncementPostProcedure from "../procedures/protected/announcements/createAnnouncementPostProcedure";
import updateAnnouncementPostProcedure from "../procedures/protected/announcements/updateAnnouncementPostProcedure";
import getAnnouncementPostProcedure from "../procedures/protected/announcements/getAnnouncementPostProcedure";
import getAnnouncementsProcedure from "../procedures/protected/announcements/getAnnouncementsProcedure";
import { createTRPCRouter } from "../trpc";
import deleteAnnouncementPostProcedure from "../procedures/protected/announcements/deleteAnnouncementPostProcedure";

export const announcementsRouter = createTRPCRouter({
  get_announcement_posts: getAnnouncementsProcedure,
  create_announcement_post: createAnnouncementPostProcedure,
  get_announcement_post: getAnnouncementPostProcedure,
  update_announcement_post: updateAnnouncementPostProcedure,
  delete_announcement_post: deleteAnnouncementPostProcedure,
});
