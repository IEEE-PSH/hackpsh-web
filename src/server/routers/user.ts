import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  is_onboarding_complete: protectedProcedure.query(() => {
    // const res = await ctx.db.query.app_user_profile.findFirst();
    return {
      message: "Success",
    };
  }),
});
