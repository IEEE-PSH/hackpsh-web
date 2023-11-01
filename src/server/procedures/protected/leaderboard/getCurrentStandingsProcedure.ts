import { protectedProcedure } from "@/server/trpc";

export default protectedProcedure.query(async ({ ctx, input }) => {
  return true;
});
