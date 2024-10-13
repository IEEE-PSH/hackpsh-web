import { getTeamNameFromUserUUID } from "@/server/dao/team";
import { protectedProcedure } from "@/server/trpc";

import { LookupUserSchema } from "@/server/zod-schemas/user";

export default protectedProcedure
  .input(LookupUserSchema)
  .mutation(async ({ ctx, input }) => {
    const result = await getTeamNameFromUserUUID(ctx.db, input.user_uuid);

    return result?.team_name;
  });
