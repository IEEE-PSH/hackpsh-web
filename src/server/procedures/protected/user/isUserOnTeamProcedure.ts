import { LookupUserSchema } from "@/server/zod-schemas/user";
import { isUserOnTeam } from "@/server/dao/user";
import { protectedProcedure } from "@/server/trpc";

export default protectedProcedure
  .input(LookupUserSchema)
  .query(async ({ ctx, input }) => {
    let teamStatus = false;
    const result = await isUserOnTeam(ctx.db, input.user_uuid);

    if (result?.user_team_uuid) {
      teamStatus = true;
    }

    return {
      is_on_team: teamStatus,
    };
  });
