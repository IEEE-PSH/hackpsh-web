"use client";
import { useEffect, useState } from "react";
import Section from "../page-assets/section";
import CountdownClock from "./countdown-clock.tsx";
import CountdownLoading from "./countdown-loading";
import { useRouter } from "next/navigation";

export default function CountdownDuring({ startTime }: { startTime: string }) {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const diff = 43200000 + Date.parse(startTime) - Date.now();
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
      router.refresh();
    }

    return () => clearTimeout(timerID);
  }, [time]);

  return (
    <Section>
      <div className="flex flex-col items-center space-y-8">
        <p className="text-2xl">This event begins in</p>
        {isLoaded ? <CountdownClock timeRem={time} /> : <CountdownLoading />}
      </div>
    </Section>
  );
}
