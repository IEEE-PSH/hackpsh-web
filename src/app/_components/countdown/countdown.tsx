"use client";
import { useEffect, useState } from "react";
import CountdownClock from "@/app/_components/countdown/countdown-clock.tsx";
import CountdownComplete from "./countdown-complete";

type CountdownProps = {
  eventStartTime: Date;
  timeRemaining: number;
};
export default function Countdown({
  eventStartTime,
  timeRemaining,
}: CountdownProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [time, setTime] = useState(timeRemaining);

  useEffect(() => {
    const diff = eventStartTime.valueOf() - Date.now();
    if (!isLoaded) {
      setIsLoaded(true);
      if (diff > 0) setTime(diff);
      else return;
    }
    const timerID = setTimeout(() => {
      setTime(diff);
    }, 1000);

    if (time < -43200000) {
      clearTimeout(timerID);
    }

    return () => clearTimeout(timerID);
  }, [time, isLoaded, eventStartTime]);

  if (time > -43200000 && time < 0) {
    return (
      <CountdownClock
        timeRemaining={43200000 + time}
        title="Event ends in"
        isLoaded={isLoaded}
      />
    );
  } else if (time <= -43200000) {
    return <CountdownComplete />;
  }

  return (
    <CountdownClock
      timeRemaining={time}
      title="Event starts in"
      isLoaded={isLoaded}
    />
  );
}
