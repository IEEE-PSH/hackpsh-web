import { UserAuthFormSchema } from "@/lib/zod-schemas/user-auth";
import { publicProcedure, router } from "./trpc";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

async function handleEmailLogin(email: string, baseURL: string) {
  const cookieStore = cookies();

  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

  await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${baseURL}/api/auth/callback`
    }
  })
}

export const authRouter = router({
  email_login: publicProcedure
    .input(UserAuthFormSchema)
    .mutation(async (opts) => {
      await handleEmailLogin(opts.input.email, opts.ctx.req.url as string);
      
      return {
        message: "Success"
      }
    })
})