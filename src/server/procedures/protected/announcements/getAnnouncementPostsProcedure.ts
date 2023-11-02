import { getAnnouncementPosts } from "@/server/dao/announcements";
import { protectedProcedure } from "@/server/trpc";

export default protectedProcedure.query(async ({ ctx }) => {
  const result = await getAnnouncementPosts(ctx.db);

  return result;
});
