import { getUserSettingsInfo } from "@/server/dao/user";
import { protectedProcedure } from "@/server/trpc";
import { LookupUserSchema } from "@/server/zod-schemas/user";

export default protectedProcedure
  .input(LookupUserSchema)
  .query(async ({ ctx, input }) => {
    const result = await getUserSettingsInfo(ctx.db, input.user_uuid);

    return {
      user_display_name: result ? result.user_display_name : null,
      user_email_address: result ? result.user_email_address : null,
      user_school_year: result ? result.user_school_year : null,
      user_major: result ? result.user_major : null,
      user_team_name: result ? result.user_team_name : null,
    };
  });
