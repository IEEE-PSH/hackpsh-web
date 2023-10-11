import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  console.log(requestUrl);
  console.log(formData);
  // const email = String(formData.get('email'))
  // const cookieStore = cookies()
  // const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

  // await supabase.auth.signInWithOtp({
  //   email,
  //   options: {
  //     emailRedirectTo: `${requestUrl.origin}/dashboard`
  //   }
  // })
}