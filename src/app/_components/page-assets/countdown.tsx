"use client";
import Section from "./section";
import { Skeleton } from "../ui/skeleton";
import { useEffect, useState } from "react";

export default function Countdown() {
  //remove usage of trpc; reliant on local machine time per render
  const [isLoaded, setIsLoaded] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const diff = Date.parse("February 2, 2024 21:57:00") - Date.now();
    if (!isLoaded) {
      setIsLoaded(true);
      if (diff > 0) setTime(diff);
      else return;
    }
    const timerID = setTimeout(() => {
      setTime(diff);
    }, 1000);

    if (time < 0) {
      clearTimeout(timerID);
    }

    return () => clearTimeout(timerID);
  }, [time]);

  if (!isLoaded) return <CountdownLoading />;
  return <CountdownClock timeRem={time} />;
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

//presentational component
function CountdownClock({ timeRem }: { timeRem: number }) {
  const { days, hours, minutes, seconds } = millisecondsToUnits(timeRem);
  return (
    <Section className="bg-neutral-950">
      <div className="flex flex-col items-center space-y-8">
        <div className="grid grid-cols-7 place-items-center items-start text-white">
          <div className="flex flex-col items-center">
            <p className="text-5xl">{days}</p>
            <p>Days</p>
          </div>
          <p className="text-5xl">:</p>
          <div className="flex flex-col items-center">
            <p className="text-5xl">{hours}</p>
            <p>Hours</p>
          </div>
          <p className="text-5xl">:</p>
          <div className="flex flex-col items-center">
            <p className="text-5xl">{minutes}</p>
            <p>Minutes</p>
          </div>
          <p className="text-5xl">:</p>
          <div className="flex flex-col items-center">
            <p className="text-5xl" suppressHydrationWarning={true}>
              {seconds}
            </p>
            <p>Seconds</p>
          </div>
        </div>
      </div>
    </Section>
  );
}

function CountdownLoading() {
  return (
    <Section className="bg-neutral-950">
      <div className="flex items-center justify-center">
        <div className="flex w-[28.25rem] justify-between">
          <Skeleton className="h-[4.5rem] w-full rounded-md" />
        </div>
      </div>
    </Section>
  );
}

// function CountdownDone() {
//   return (
//     <Section className="bg-neutral-950">
//       <p className="text-center text-5xl">Test</p>
//     </Section>
//   );
// }
