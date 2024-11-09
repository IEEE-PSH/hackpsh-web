import { doesTeamExist } from "@/server/dao/user";
import { protectedProcedure } from "@/server/trpc";
import { LookupTeamSchema } from "@/server/zod-schemas/user";

export default protectedProcedure
  .input(LookupTeamSchema)
  .query(async ({ ctx, input }) => {
    const result = await doesTeamExist(ctx.db, input.team_uuid);
    return result;
  });
