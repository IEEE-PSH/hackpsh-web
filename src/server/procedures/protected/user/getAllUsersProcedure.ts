import { getAllUsers } from "@/server/dao/user";
import { protectedProcedure } from "@/server/trpc";

export default protectedProcedure.query(async ({ ctx }) => {
  const result = await getAllUsers(ctx.db);

  return result;
});
