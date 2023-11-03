export default function FormStep({ step }: { step: string }) {
  function FormStepNumber({ children }: { children: string }) {
    return (
      <div
        className={`${children <= step ? "bg-primary" : "bg-secondary"
          } flex h-[3rem] w-[3rem] items-center justify-center rounded-full text-2xl font-bold text-foreground`}
      >
        {children}
      </div>
    );
  }
  return (
    <>
      <div className="relative flex justify-between w-full mb-8 space-x-full">
        <FormStepNumber>1</FormStepNumber>
        <FormStepNumber>2</FormStepNumber>
        <FormStepNumber>3</FormStepNumber>
        <div className="absolute z-[-5] mt-6 h-[0.05rem] w-full bg-muted-foreground"></div>
      </div>
    </>
  );
}