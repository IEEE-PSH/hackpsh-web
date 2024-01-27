"use client";
import { useEffect, useState } from "react";
import Section from "./section";

//must add condition for end of countdown
export default function Countdown() {
  const timeDiff = () => {
    return Math.abs(Date.parse("March 23, 2024 10:00:00") - Date.now());
  };
  const [time, setTime] = useState(timeDiff);

  useEffect(() => {
    const timerID = setTimeout(() => {
      setTime(timeDiff);
    }, 1000);
    return () => clearTimeout(timerID);
  }, [timeDiff]);

  if (time == 0) return;
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
