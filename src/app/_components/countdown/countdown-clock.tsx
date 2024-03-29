import Section from "../page-assets/section";
import { Skeleton } from "../ui/skeleton";

type CountdownClockProps = {
  timeRemaining: number;
  title: string;
  isLoaded: boolean;
};

export default function CountdownClock({
  timeRemaining,
  title,
  isLoaded,
}: CountdownClockProps) {
  const { days, hours, minutes, seconds } = millisecondsToUnits(timeRemaining);

  return (
    <Section className="border-t bg-primary/90">
      <div className="mx-auto flex max-w-[28rem] flex-col items-center space-y-8">
        <p className="text-3xl font-semibold text-primary-foreground">{title}</p>
        <div className="flex justify-between w-full text-primary-foreground">
          {isLoaded ? (
            <>
              <div className="flex flex-col items-center">
                <p className="font-mono text-5xl">{days}</p>
                <p>Days</p>
              </div>
              <p className="text-5xl">:</p>
              <div className="flex flex-col items-center">
                <p className="font-mono text-5xl">{hours}</p>
                <p>Hours</p>
              </div>
              <p className="text-5xl">:</p>
              <div className="flex flex-col items-center">
                <p className="font-mono text-5xl">{minutes}</p>
                <p>Minutes</p>
              </div>
              <p className="text-5xl">:</p>
              <div className="flex flex-col items-center">
                <p className="font-mono text-5xl">{seconds}</p>
                <p>Seconds</p>
              </div>
            </>
          ) : (
            <Skeleton className="h-[4.5rem] w-[28.25rem] rounded-md bg-background/10" />
          )}
        </div>
      </div>
    </Section>
  );
}

function millisecondsToUnits(totalTime: number) {
  const seconds = Math.floor((totalTime / 1000) % 60).toLocaleString(`en-US`, {
    minimumIntegerDigits: 2,
  });
  const minutes = Math.floor((totalTime / 60000) % 60).toLocaleString(`en-US`, {
    minimumIntegerDigits: 2,
  });
  const hours = Math.floor((totalTime / 3600000) % 24).toLocaleString(`en-US`, {
    minimumIntegerDigits: 2,
  });
  const days = Math.floor(totalTime / 86400000).toLocaleString(`en-US`, {
    minimumIntegerDigits: 2,
  });
  return { days, hours, minutes, seconds };
}
