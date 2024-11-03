import { getTeams } from "@/server/dao/team";
import { protectedProcedure } from "@/server/trpc";

export default protectedProcedure.query(async ({ ctx }) => {
  const result = await getTeams(ctx.db);

  return result;
});
