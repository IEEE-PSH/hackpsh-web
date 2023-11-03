import ProtectedSiteHeader from "@/app/_components/nav/protected-site-header";
import OnboardingPersonalDetailsForm from "@/app/_components/onboarding/personal-details-form";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding | Personal Details | HackPSH",
  description: "Weclome to HackPSH!",
}

// If they land on onboarding, that means the user was either redirected through
// api/auth/callback or the middleware function
export default function Page() {
  return (
    <>
      <ProtectedSiteHeader />
      <div className="container relative flex-col items-center justify-center space-y-6">
        <h1 className="mt-10 mb-10 text-3xl font-bold text-center">Tell Us About Yourself!</h1>
        <OnboardingPersonalDetailsForm />
      </div>
    </>
  )
}
