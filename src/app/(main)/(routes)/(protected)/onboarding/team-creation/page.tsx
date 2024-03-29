import NumberStepper from "@/app/_components/onboarding/number-stepper";
import TeamFormWrapper from "@/app/_components/onboarding/team-form-wrapper";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding | Team Creation | HackPSH",
  description: "Create or Join a Team!",
};

export default function Page() {
  return (
    <>
      <h1 className="mb-10 text-center text-3xl font-bold">
        Team Creation
      </h1>
      <NumberStepper currentStep={2} maxStep={3} />
      <TeamFormWrapper />
    </>
  );
}
