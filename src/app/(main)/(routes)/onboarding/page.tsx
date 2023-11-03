import ProtectedSiteHeader from "@/app/_components/nav/protected-site-header";
import { OnboardingForm } from "@/app/_components/forms/onboarding-form";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding | HackPSH",
  description: "Weclome to HackPSH!",
}

// If they land on onboarding, that means the user was either redirected through
// api/auth/callback or the middleware function
export default function Page() {
  return (
    <>
      <ProtectedSiteHeader />
      <div className="container relative flex-col items-center justify-center space-y-6">
        <OnboardingForm />
      </div>
    </>
  )
}
