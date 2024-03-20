import { serverTRPC } from "@/app/_trpc/server";
import Countdown from "./countdown-section";

export default async function CountdownWrapper() {
  const { eventStartTime, timeRemaining } =
    await serverTRPC.countdown.get_time_remaining.query();

  return (
    <Countdown eventStartTime={eventStartTime} timeRemaining={timeRemaining} />
  );
}
