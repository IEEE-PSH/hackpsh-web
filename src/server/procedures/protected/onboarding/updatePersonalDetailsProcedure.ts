import { protectedProcedure } from "@/server/trpc";

export default protectedProcedure.mutation(() => {
  return true;
});
