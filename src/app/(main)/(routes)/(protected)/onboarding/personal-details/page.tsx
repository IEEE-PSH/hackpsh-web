import NumberStepper from "@/app/_components/onboarding/number-stepper";
import OnboardingPersonalDetailsForm from "@/app/_components/onboarding/personal-details-form";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding | Personal Details | HackPSH",
  description: "Welcome to HackPSH!",
};

// If they land on onboarding, that means the user was either redirected through
// api/auth/callback or the middleware function
export default function Page() {
  return (
    <>
      <h1 className="mb-8 text-center text-2xl font-semibold leading-none tracking-tight">
        Personal Details
      </h1>
      <NumberStepper currentStep={1} maxStep={3} />
      <OnboardingPersonalDetailsForm />
    </>
  );
}
