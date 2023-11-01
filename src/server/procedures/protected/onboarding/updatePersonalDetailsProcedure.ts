import { protectedProcedure } from "@/server/trpc";

export default protectedProcedure.mutation(async ({ ctx, input }) => {
  return {
    update_personal_details: true,
  };
});
