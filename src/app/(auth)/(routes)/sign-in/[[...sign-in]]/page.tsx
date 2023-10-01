import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return <SignIn afterSignInUrl={process.env.NEXT_PUBLIC_AFTER_SIGN_IN_URL} />
}
