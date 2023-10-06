import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignIn
      afterSignInUrl={process.env.NEXT_PUBLIC_AFTER_SIGN_IN_URL}
      afterSignUpUrl={process.env.NEXT_PUBLIC_AFTER_SIGN_UP_URL}
      signUpUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL}
    />
  )
}
