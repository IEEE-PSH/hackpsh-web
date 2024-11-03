import NumberStepper from "@/app/_components/onboarding/number-stepper";
import SupportUsForm from "@/app/_components/onboarding/support-us-form";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding | Support Us | HackPSH",
  description: "Help us make our event better!",
};

export default function Page() {
  return (
    <>
      <h1 className="mb-8 text-center text-2xl font-semibold leading-none tracking-tight">
        Support IEEE!
      </h1>
      <NumberStepper currentStep={3} maxStep={3} />
      <SupportUsForm />
    </>
  );
}
