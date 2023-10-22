import { UserAuthFormSchema } from "@/app/_lib/zod-schemas/user-auth";
import { publicProcedure, createTRPCRouter } from "../trpc";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

async function handleEmailLogin(email: string, baseURL: string) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

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
      await handleEmailLogin(input.email, new URL(ctx.req.url).origin);

      return {
        message: "Success",
      };
    }),
});
