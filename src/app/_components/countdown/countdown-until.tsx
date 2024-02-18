"use client";
import { useEffect, useState } from "react";
import CountdownLoading from "./countdown-loading";
import CountdownClock from "./countdown-clock.tsx";

export default function CountdownUntil() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const diff = Date.parse("March 23, 2024 10:00:00") - Date.now();
    if (!isLoaded) {
      setIsLoaded(true);
      if (diff > 0) setTime(diff);
      else return;
    }
    const timerID = setTimeout(() => {
      setTime(diff);
    }, 1000);

    if (diff < 1) {
      clearTimeout(timerID);
    }

    return () => clearTimeout(timerID);
  }, [time]);

  if (!isLoaded) return <CountdownLoading />;
  return <CountdownClock timeRem={time} text="This event begins in" />;
}
