import { getUserInfo } from "@/server/dao/user";
import { protectedProcedure } from "@/server/trpc";
import { LookupUserSchema } from "@/server/zod-schemas/user";

export default protectedProcedure
  .input(LookupUserSchema)
  .query(async ({ ctx, input }) => {
    const result = await getUserInfo(ctx.db, input.user_uuid);

    return {
      user_display_name: result!.user_display_name,
      user_email_address: result!.user_email_address,
      user_role: result!.user_role,
      user_uuid: result!.user_uuid,
    };
  });
