import { createAnnouncementPost } from "@/server/dao/announcements";
import { getUserRole } from "@/server/dao/user";
import { protectedProcedure } from "@/server/trpc";
import { CreateAnnouncementPostSchema } from "@/server/zod-schemas/announcements";
import { TRPCError } from "@trpc/server";

export default protectedProcedure
  .input(CreateAnnouncementPostSchema)
  .mutation(async ({ ctx, input }) => {
    const user_data = await getUserRole(ctx.db, input.author_uuid);

    if (user_data!.user_role !== "admin") {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User must be an admin to create announcements.",
      });
    }

    await createAnnouncementPost(
      ctx.db,
      input.author_uuid,
      input.title,
      input.content,
    );

    return {
      create_announcement_post: true,
    };
  });
