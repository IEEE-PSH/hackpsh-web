"use client";
import { useEffect, useState } from "react";
import CountdownClock from "@/app/_components/countdown/countdown-clock.tsx";
import { useRouter } from "next/navigation";
import CountdownLoading from "@/app/_components/countdown/countdown-loading";
import Section from "@/app/_components/page-assets/section";

export default function CountdownUntil({ startTime }: { startTime: string }) {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const diff = Date.parse(startTime) - Date.now();
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
