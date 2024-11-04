import { isTeamCreationEnabled } from "@/server/dao/event";
import { protectedProcedure } from "@/server/trpc";

export default protectedProcedure.query(async ({ ctx }) => {
  const result = await isTeamCreationEnabled(ctx.db);

  return result;
});
