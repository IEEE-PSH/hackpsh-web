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

  const twelveHourMS = 43200000;
  const eventHasCompleted = time < -twelveHourMS;
  const eventStillActive = time > -twelveHourMS && time < 0;

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

    if (eventHasCompleted) {
      clearTimeout(timerID);
    }

    return () => clearTimeout(timerID);
  }, [time, isLoaded, eventStartTime, eventHasCompleted]);

  if (eventStillActive)
    return (
      <CountdownClock
        timeRemaining={twelveHourMS + time}
        isLoaded={isLoaded}
        title="Event ends in"
      />
    );
  else if (eventHasCompleted) return <CountdownComplete />;

  return (
    <CountdownClock
      timeRemaining={time}
      isLoaded={isLoaded}
      title="Event starts in"
    />
  );
}
