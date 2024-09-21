import { getAnnouncementPost } from "@/server/dao/announcements";
import { protectedProcedure } from "@/server/trpc";
import { LookupAnnouncementPostSchema } from "@/server/zod-schemas/announcements";

export default protectedProcedure
  .input(LookupAnnouncementPostSchema)
  .query(async ({ ctx, input }) => {
    const result = await getAnnouncementPost(ctx.db, input.announcement_id);

    return result;
  });
