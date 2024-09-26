import { getUsers } from "@/server/dao/user";
import { protectedProcedure } from "@/server/trpc";
import { LookupUsersFromRoleSchema } from "@/server/zod-schemas/user";

export default protectedProcedure
  .input(LookupUsersFromRoleSchema)
  .query(async ({ ctx, input }) => {
    const result = await getUsers(ctx.db, input.role);

    return result;
  });
