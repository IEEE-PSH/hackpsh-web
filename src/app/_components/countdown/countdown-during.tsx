"use client";
import { useEffect, useState } from "react";
import CountdownLoading from "./countdown-loading";
import CountdownClock from "./countdown-clock.tsx";

export default function CountdownDuring() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const diff =
      43200000 + Date.parse("February 18, 2024 1:00:00") - Date.now();
    if (!isLoaded) {
      setIsLoaded(true);
      if (diff > 0) setTime(diff);
      else return;
    }
    const timerID = setTimeout(() => {
      setTime(diff);
    }, 1000);

    if (diff < -43200000) {
      clearTimeout(timerID);
    }

    return () => clearTimeout(timerID);
  }, [time]);

  if (!isLoaded) return <CountdownLoading />;
  return <CountdownClock timeRem={time} text="This event ends in" />;
}
