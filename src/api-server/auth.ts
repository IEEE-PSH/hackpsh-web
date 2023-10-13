import { UserAuthFormSchema } from "@/lib/zod-schemas/user-auth";
import { publicProcedure, router } from "./trpc";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

async function handleEmailLogin(email: string) {
  const cookieStore = cookies();

  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

  await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : `http://localhost:3000`}/api/auth/callback`
    }
  })
}

export const authRouter = router({
  email_login: publicProcedure
    .input(UserAuthFormSchema)
    .mutation(async (opts) => {
      await handleEmailLogin(opts.input.email);
      
      return {
        message: "Success"
      }
    })
})