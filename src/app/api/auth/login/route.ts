import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from "next/headers"
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();

  const newUserEmail = String(formData.get("email"));

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  await supabase.auth.signInWithOtp({
    email: newUserEmail,
    options: {
      emailRedirectTo: `${requestUrl.origin}/api/auth/callback`
    }
  })
  
  return NextResponse.json({
    message: "Accepted"
  }, {
    status: 200
  });
}