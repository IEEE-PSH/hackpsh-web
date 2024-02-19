import { serverTRPC } from "@/app/_trpc/server";
import Countdown from "./countdown";
import CountdownComplete from "./countdown-complete";

export default async function CountdownWrapper() {
  const { eventStartTime, timeRemaining } =
    await serverTRPC.countdown.get_time_remaining.query();

  if (timeRemaining <= -43200000) return <CountdownComplete />;
  return (
    <Countdown eventStartTime={eventStartTime} timeRemaining={timeRemaining} />
  );
}
