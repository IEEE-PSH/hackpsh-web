import { deleteAnnouncementPost } from "@/server/dao/announcements";
import { protectedProcedure } from "@/server/trpc";
import { DeleteAnnouncementPostSchema } from "@/server/zod-schemas/announcements";

export default protectedProcedure
  .input(DeleteAnnouncementPostSchema)
  .mutation(async ({ ctx, input }) => {
    await deleteAnnouncementPost(
      ctx.db,
      input.user_uuid,
      input.announcement_id,
    );

    return {
      update_announcement_post: true,
    };
  });
