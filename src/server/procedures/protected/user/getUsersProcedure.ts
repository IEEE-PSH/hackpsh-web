import { getUsers } from "@/server/dao/user";
import { protectedProcedure } from "@/server/trpc";

export default protectedProcedure.query(async ({ ctx }) => {
  const result = await getUsers(ctx.db);

  return result;
});
