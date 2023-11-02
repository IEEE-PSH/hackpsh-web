import { getAnnouncements } from "@/server/dao/announcements";
import { protectedProcedure } from "@/server/trpc";

export default protectedProcedure.query(async ({ ctx }) => {
  const announcement_posts = await getAnnouncements(ctx.db);

  return announcement_posts;
});
