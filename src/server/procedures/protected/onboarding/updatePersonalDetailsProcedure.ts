import { protectedProcedure } from "@/server/trpc";

// eslint-disable-next-line @typescript-eslint/require-await
export default protectedProcedure.mutation(async ({ ctx, input }) => {
  return;
});
