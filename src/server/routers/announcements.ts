import createAnnouncementPostProcedure from "../procedures/protected/announcements/createAnnouncementPostProcedure";
import getAnnouncementPostsProcedure from "../procedures/protected/announcements/getAnnouncementPostsProcedure";
import { createTRPCRouter } from "../trpc";

export const announcementsRouter = createTRPCRouter({
  get_announcement_posts: getAnnouncementPostsProcedure,
  create_announcement_post: createAnnouncementPostProcedure,
});
