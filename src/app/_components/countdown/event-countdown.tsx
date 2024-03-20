import { serverTRPC } from "@/app/_trpc/server";
import CountdownSection from "./countdown-section";

export default async function EventCountdown() {
  const { eventStartTime, timeRemaining } =
    await serverTRPC.countdown.get_time_remaining.query();

  return (
    <CountdownSection eventStartTime={eventStartTime} timeRemaining={timeRemaining} />
  );
}
