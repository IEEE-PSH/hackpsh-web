import { getUserTeamInfo } from "@/server/dao/user";
import { protectedProcedure } from "@/server/trpc";
import { LookupUserSchema } from "@/server/zod-schemas/user";
import { sql } from "drizzle-orm";

export default protectedProcedure
  .input(LookupUserSchema)
  .query(async ({ ctx, input }) => {
    const result = await getUserTeamInfo(ctx.db, input.user_uuid);

    return result;
  });
