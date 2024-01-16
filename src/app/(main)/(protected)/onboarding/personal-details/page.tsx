import OnboardingPersonalDetailsForm from "@/app/_components/onboarding/personal-details-form";
import { type Metadata } from "next";
export const metadata: Metadata = {
  title: "Onboarding | Personal Details | HackPSH",
  description: "Welcome to HackPSH!",
}

// If they land on onboarding, that means the user was either redirected through
// api/auth/callback or the middleware function
export default function Page() {
  return (
      <div className="container relative flex-col items-center justify-center space-y-6 md:max-w-xl">
          <h1 className="mt-10 mb-10 text-3xl font-bold text-center">Tell Us About Yourself!</h1>
          <OnboardingPersonalDetailsForm />
      </div>
  )
}