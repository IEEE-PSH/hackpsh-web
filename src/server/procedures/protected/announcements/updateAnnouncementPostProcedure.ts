import { updateAnnouncementPost } from "@/server/dao/announcements";
import { protectedProcedure } from "@/server/trpc";
import { UpdateAnnouncementPostSchema } from "@/server/zod-schemas/announcements";

export default protectedProcedure
  .input(UpdateAnnouncementPostSchema)
  .mutation(async ({ ctx, input }) => {
    await updateAnnouncementPost(
      ctx.db,
      input.user_uuid,
      input.announcement_id,
      input.title,
      input.content,
    );

    return {
      update_announcement_post: true,
    };
  });
