import { getUserInfo } from "@/server/dao/user";
import { protectedProcedure } from "@/server/trpc";
import { LookupUserSchema } from "@/server/zod-schemas/user";

export default protectedProcedure
  .input(LookupUserSchema)
  .query(async ({ ctx, input }) => {
    const result = await getUserInfo(ctx.db, input.user_uuid);

    return {
      user_first_name: result!.user_first_name,
      user_last_name: result!.user_last_name,
      user_display_name: result!.user_display_name,
      user_email_address: result!.user_email_address,
      user_role: result!.user_role,
      user_uuid: result!.user_uuid,
      user_major: result!.user_major,
      user_school_year: result!.user_school_year,
      user_support_administrative: result!.user_support_administrative,
      user_support_technical: result!.user_support_technical,
      user_team_uuid: result!.user_team_uuid,
    };
  });
