import { getUserInfo } from "@/server/dao/user";
import { protectedProcedure } from "@/server/trpc";
import { LookupUserSchema } from "@/server/zod-schemas/user";

export default protectedProcedure
  .input(LookupUserSchema)
  .query(async ({ ctx, input }) => {
    const result = await getUserInfo(ctx.db, input.user_uuid);

    return {
      user_display_name: result ? result.user_display_name : null,
      user_email_address: result ? result.user_email_address : null,
      user_role: result ? result.user_role : null,
      user_uuid: result ? result.user_uuid : null,
    };
  });
