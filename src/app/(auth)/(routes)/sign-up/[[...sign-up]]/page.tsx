import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignUp
      afterSignInUrl={process.env.NEXT_PUBLIC_AFTER_SIGN_IN_URL}
      afterSignUpUrl={process.env.NEXT_PUBLIC_AFTER_SIGN_UP_URL}
      signInUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}
    />
  )
}
