import ProtectedSiteHeader from "@/app/_components/nav/protected-site-header";
import { OnboardingForm } from "@/app/_components/onboarding-form";

export default function Page() {
  return (
    <>
      <ProtectedSiteHeader />
      <div className="container relative grid flex-col items-center justify-center h-screen">
        <OnboardingForm />
      </div>
    </>
  )
}
