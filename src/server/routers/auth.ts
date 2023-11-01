import { UserAuthFormSchema } from "@/app/_lib/zod-schemas/forms/user-auth";
import { publicProcedure, createTRPCRouter } from "../trpc";
import { type SupabaseClient } from "@supabase/auth-helpers-nextjs";

async function handleEmailLogin(
  supabase: SupabaseClient,
  email: string,
  baseURL: string,
) {
  await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${baseURL}/api/auth/callback`,
    },
  });
}

export const authRouter = createTRPCRouter({
  email_login: publicProcedure
    .input(UserAuthFormSchema)
    .mutation(async ({ ctx, input }) => {
      await handleEmailLogin(
        ctx.supabase,
        input.email,
        new URL(ctx.req.url).origin,
      );

      return {
        message: "Success",
      };
    }),
});
