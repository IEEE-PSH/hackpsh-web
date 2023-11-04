import { cn } from "@/app/_lib/client-utils";

type StepperNumberProps = { currentStep: number, maxStep: number }

export default function NumberStepper({ currentStep, maxStep }: StepperNumberProps) {

  const stepperElements: JSX.Element[] = [];
  for (let index = 1; index <= maxStep; index++) {
    stepperElements.push(<StepNumber displayNumber={index} currentStep={currentStep} />)
  }

  return (
    <>
      <div className="relative flex justify-between w-full mb-8 space-x-full">
        {stepperElements}
        <div className="absolute z-[-5] mt-6 h-[0.05rem] w-full bg-muted-foreground"></div>
      </div>
    </>
  );
}

export function StepNumber({ displayNumber, currentStep }: { displayNumber: number, currentStep: number }) {
  return (
    <div
      className={cn(
        currentStep == displayNumber ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground",
        "flex h-[3rem] w-[3rem] items-center justify-center rounded-full text-2xl font-bold"
      )}
    >
      {displayNumber}
    </div>
  );
}